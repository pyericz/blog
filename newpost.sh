#!/bin/bash
BASEURL="_posts/"
NOW=$(date +"%Y-%m-%d")
HYPHEN="-"
EXT=".md"
FILE=$BASEURL$NOW$HYPHEN${1// /-}$EXT
echo $FILE" created!"
touch $FILE
echo "---" >> $FILE
echo "layout: post"  >> $FILE
echo "title: \""$1"\""  >> $FILE
echo "date: "$NOW  >> $FILE
echo "categories: "  >> $FILE
echo "author: pyericz" >> $FILE
echo "---" >> $FILE
