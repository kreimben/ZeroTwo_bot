import discord
from discord.ext import commands

intents = discord.Intents.all()
intents.voice_states = True
bot = commands.Bot(intents=intents)
