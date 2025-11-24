#!/bin/bash

# Function to create a file from template
function create_from_template() {
    if [ -z "$1" ]; then
        echo "Usage: A.cc"
        return 1
    fi
    
    FILENAME="$1"
    
    if [ -f "$FILENAME" ]; then
        echo "File $FILENAME already exists!"
        return 1
    fi
    
    cp template.cc "$FILENAME"
    echo "Created $FILENAME from template"
}

# Function to compile and run
function run() {
    if [ -z "$1" ]; then
        echo "Usage: run A"
        return 1
    fi
    
    FILENAME="$1"
    
    # Add .cc extension if not provided
    if [[ ! "$FILENAME" =~ \.cc$ ]]; then
        FILENAME="${FILENAME}.cc"
    fi
    
    if [ ! -f "$FILENAME" ]; then
        echo "File $FILENAME does not exist!"
        return 1
    fi
    
    # Extract base name without extension
    BASENAME="${FILENAME%.cc}"
    
    echo "Compiling $FILENAME..."
    g++ -std=c++17 -O2 -Wall -Wextra -DNEAL_DEBUG "$FILENAME" -o "$BASENAME"
    
    if [ $? -ne 0 ]; then
        echo "Compilation failed!"
        return 1
    fi
    
    echo "Running $BASENAME..."
    echo "-------------------"
    ./"$BASENAME"
}

# Export the functions
export -f run
