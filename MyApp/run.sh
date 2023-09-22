#!/bin/bash

# Assign first argument to 'mode' variable
mode=$1

# if 'dev' mode
if [ "$mode" == "dev" ]; then
    echo "Setting .env for development"
    echo "mode=development" > .env
    echo "API_URL=http://localhost:5000" >> .env

# if 'prod' mode
elif [ "$mode" == "prod" ]; then
    echo "Setting .env for production"
    echo "mode=development" > .env
    echo "API_URL=https://94e06f5c89cd.ngrok.app" >> .env

else
    echo "Unknown mode: $mode"
    echo "Please use './run.sh dev' or './run.sh prod'"
    exit 1
fi

# Start expo
expo start --clear
