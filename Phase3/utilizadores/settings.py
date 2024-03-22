#!/usr/bin/python
import sqlite3
import json
from flask import Flask, request, jsonify
global conn

global app

try:
    # check_same_thread=False because of flask
    conn = sqlite3.connect('db/users.db', check_same_thread=False)
    print("Opened database successfully")
    app = Flask(__name__)
except:
    print("FAILED opening database")