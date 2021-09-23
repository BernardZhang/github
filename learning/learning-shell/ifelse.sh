#!/bin/sh

NUM=10
STR="Hello"

if [ $NUM == 10 ]; then
    echo '$NUM == 10 is true'
else
    echo '$NUM = 10 is false'
fi

if [ $STR == 'Hello' ]; then
    echo '$STR == Hello is true'
else
    echo '$STR == Hello is false'
fi
