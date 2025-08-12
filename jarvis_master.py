import speech_recognition as sr
import pyttsx3
import wikipedia
import requests
import pyjokes
import re
import random
import time

API_KEY = "6ef6a62b3bfcc7da1ec3c2a26a2ac170"

engine = pyttsx3.init()
engine.setProperty('rate', 130)
engine.setProperty('volume', 1.0)

r = sr.Recognizer()

# Thoda variety ke liye ye functions
def respectful_prefix():
    return random.choice(["Ji sir", "Yes sir", "Ji master", "Yes master"])

def speak(text):
    engine.say(text)
    engine.runAndWait()

def listen(timeout=None, phrase_time_limit=None):
    with sr.Microphone() as source:
        r.adjust_for_ambient_noise(source, duration=1)
        print("Listening...")
        try:
            audio = r.listen(source, timeout=timeout, phrase_time_limit=phrase_time_limit)
            query = r.recognize_google(audio, language='en-IN')  # Hindi bhi chahiye to 'hi-IN'
            print(f"You said: {query}")
            return query.lower()
        except sr.WaitTimeoutError:
            return ""
        except sr.UnknownValueError:
            return ""
        except sr.RequestError:
            speak("Internet connection error.")
            return ""

def get_weather(city):
    url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric&lang=en"
    try:
        response = requests.get(url)
        data = response.json()
        if data.get("cod") != 200:
            return None
        desc = data['weather'][0]['description']
        temp = data['main']['temp']
        return desc, temp
    except:
        return None

def calculate(expression):
    try:
        expression = re.sub(r'[^0-9\.\+\-\*\/\(\) ]', '', expression)
        result = eval(expression)
        return f"The result is {result}"
    except:
        return "Calculation error."

def get_joke():
    return pyjokes.get_joke()

def process_command(command):
    if "weather" in command:
        words = command.split()
        city = None
        for i, w in enumerate(words):
            if w == "weather" and i + 1 < len(words):
                city = words[i + 1]
                break
        if city:
            weather = get_weather(city)
            if weather:
                desc, temp = weather
                # Simple logic for good/bad weather
                bad_words = ['rain', 'storm', 'thunder', 'snow', 'drizzle', 'shower']
                if any(word in desc.lower() for word in bad_words):
                    return f"{respectful_prefix()}, aaj ka mausam bahut kharab hai, aap bahar na jaayein, aapke liye khatarnak ho sakta hai."
                else:
                    return f"{respectful_prefix()}, aaj ka mausam kafi saaf aur sundar hai, taapman hai {temp} degree Celsius."
            else:
                return f"{respectful_prefix()}, mujhe {city} ka mausam nahi mil paaya."
        else:
            return f"{respectful_prefix()}, kripya sheher ka naam batayein."

    if any(word in command for word in ['experiment', 'formula', 'search']):
        return f"Master, ye aapke liye khatarnak ho sakta hai."

    if any(op in command for op in ['+', '-', '*', '/', 'calculate']):
        expr = re.sub(r'calculate', '', command)
        return calculate(expr)

    if "joke" in command or "funny" in command:
        return get_joke()

    try:
        summary = wikipedia.summary(command, sentences=2)
        return f"{respectful_prefix()}, {summary}"
    except:
        return f"{respectful_prefix()}, mujhe iske baare mein jaankari nahi mili."

def main():
    speak("Jarvis tayar hai, master. Jab bhi bulaoge, main sun raha hoon.")
    while True:
        print("Wake word 'jarvis' ke liye sun raha hoon...")
        text = listen(timeout=5, phrase_time_limit=3)
        if "jarvis" in text:
            speak(random.choice([ "Ji sir, bataiye kya aadesh hai?", "Yes master, aapke hukam ka intezaar hai."]))
            print("Aapka hukam sun raha hoon...")
            query = listen(timeout=7, phrase_time_limit=7)
            if query:
                response = process_command(query)
                print(f"Jarvis: {response}")
                speak(response)
            else:
                speak("Kuch samajh nahi aaya, master. Kripya dobara kahiye.")
        time.sleep(0.5)

if __name__ == "__main__":
    main()