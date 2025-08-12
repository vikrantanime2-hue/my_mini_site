import speech_recognition as sr
import pyttsx3
import wikipedia
import requests
import pyjokes
import re
import time

API_KEY = "6ef6a62b3bfcc7da1ec3c2a26a2ac170"

engine = pyttsx3.init()
engine.setProperty('rate', 160)
engine.setProperty('volume', 1.0)

r = sr.Recognizer()

def speak(text):
    engine.say(text)
    engine.runAndWait()

def listen(timeout=None, phrase_time_limit=None):
    with sr.Microphone() as source:
        print("Sun raha hoon...")
        r.adjust_for_ambient_noise(source, duration=1)
        try:
            audio = r.listen(source, timeout=timeout, phrase_time_limit=phrase_time_limit)
            query = r.recognize_google(audio, language='hi-IN')
            print(f"Suna: {query}")
            return query.lower()
        except sr.WaitTimeoutError:
            return ""
        except sr.UnknownValueError:
            return ""
        except sr.RequestError:
            speak("Internet connection nahi hai.")
            return ""

def get_weather(city):
    url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric&lang=hi"
    try:
        response = requests.get(url)
        data = response.json()
        if data.get("cod") != 200:
            return "Shahar nahi mila."
        desc = data['weather'][0]['description']
        temp = data['main']['temp']
        humidity = data['main']['humidity']
        return f"{city} ka mausam {desc} hai, temperature {temp} degree Celsius aur humidity {humidity} percent hai."
    except:
        return "Mausam ki jankari prapt nahi ho paayi."

def calculate(expression):
    try:
        expression = re.sub(r'[^0-9\.\+\-\*\/\(\) ]', '', expression)
        result = eval(expression)
        return f"Result hai {result}"
    except:
        return "Calculation mein dikkat hai."

def get_joke():
    return pyjokes.get_joke(language='en', category='all')

def process_command(command):
    if "weather" in command or "mausam" in command:
        words = command.split()
        city = None
        for i, w in enumerate(words):
            if w in ["weather", "mausam"]:
                if i+1 < len(words):
                    city = words[i+1]
                    break
        if city:
            return get_weather(city)
        else:
            return "Kaunse shahar ka mausam chahiye?"

    if any(op in command for op in ['+', '-', '*', '/', 'calculate', 'jod', 'ghata', 'guna', 'bhag']):
        expr = command.replace("calculate", "").strip()
        expr = expr.replace("jod", "+").replace("ghata", "-").replace("guna", "*").replace("bhag", "/")
        return calculate(expr)

    if "joke" in command or "mazaak" in command or "funny" in command:
        return get_joke()

    try:
        result = wikipedia.summary(command, sentences=2)
        return result
    except:
        return "Maaf kijiye, iska jawab nahi mil paaya."

def main():
    speak("Jarvis tayar hai. Jab bhi bulao, main sun raha hoon.")
    while True:
        print("Listening for wake word 'jarvis'...")
        text = listen(timeout=5, phrase_time_limit=3)
        if "jarvis" in text:
            speak("Ji, boliye.")
            print("Sun raha hoon aapka sawal...")
            query = listen(timeout=7, phrase_time_limit=7)
            if query:
                response = process_command(query)
                if response:
                    print("Jarvis:", response)
                    speak(response)
                else:
                    speak("Mujhe iska jawab nahi pata.")
            else:
                speak("Kuch samajh nahi aaya. Dobara kaho.")
        time.sleep(0.5)

if __name__ == "__main__":
    main()
