echo 'this is a test' | awk '{print $0}'

echo '\neach line:'
awk '{print $0}' ifelse.sh

echo '\nfirst word:'
awk '{print $1}' ifelse.sh

echo '\n\b demo.txt'
awk '{print $3}' demo.txt

echo '\n\n /etc/passwd'
cat /etc/passwd | awk -F ':' '{print $5}'

echo 'bernard.zhang88@gmail.com' | awk -F '[.@]' '{for(i=1;i<=NF;i++) {printf "%-10s", $i}; print "\n"$0}'

echo '\n\n $NF last word'
awk '{print toupper($NF)}' demo.txt

echo '\n\n $NR last second word'
awk '{print NR ") " $(NF - 1)}' demo.txt


echo '\n\n\n 条件输出 startswith total'
awk '$1=="total" {print $0}' demo.txt
echo '\n\n not startswith total'
awk '$1!="total" {print $0}' demo.txt
awk '/total/ {print $0}' demo.txt
awk '$1 !~ /total/ {print $0}' demo.txt
awk '!/total/ {print $0}' demo.txt

email='bernard.zhang88@gmail.com'

echo '\n\n awk -f progfile'
echo $email | awk 'BEGIN{FS="@"} {print $0,NR,$NR,NF,$NF} END{print $NF,FS}'
