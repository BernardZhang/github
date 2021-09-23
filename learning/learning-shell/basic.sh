#!/bin/sh


echo "ps | grep $$"
echo `ps | grep $$`

echo 'which bash'
echo `which bash`

echo 'Hello Shell!'

echo '------ Variables exercise -----'
PRICE_PER_APPLE=5
MyFirstLetters=ABC
greeting='Hello     world!'

echo "THe price of an Apple today is: \$HK $PRICE_PER_APPLE"

echo "The first 10 letters in the alphabet are: ${MyFirstLetters}DEFGHIJ"

echo $greeting" now with spaces: $greeting"

FILELIST=`ls`
FileWithTimeStamp=/tmp/my-dir/file_$(/bin/date +%Y-%m-%d).txt

echo $FILELIST
echo $FileWithTimeStamp
