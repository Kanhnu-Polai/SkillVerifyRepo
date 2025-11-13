from google import genai


client = genai.Client(api_key="AIzaSyA5rwivMmKUK5g_mXn7bl3iPmNOy8j8qi8")

response = client.models.generate_content(
    model="gemini-2.5-flash", contents="Give 10 springboot questions"
)
print(response.text)