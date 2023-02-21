#!/bin/awk -f
function find_min(num1, num2)
{
  if (num1 < num2) {
    return num1
  }
  return num2
}

BEGIN {
  math = 0
  english = 0
  computer = 0
  min = 101
  max = 0


  printf "NAME    NO.   MATH    ENGLISH   COMPUTER    TOTAL\n"
  printf "-------------------------------------------------\n"
}
# 运行中
{
  math += $3
  english += $4
  computer += $5
  min = find_min($3, min)
  printf "%-6s %-6s %4d %8d %8d %8d %5d\n", $1, $2, $3,$4,$5, $3+$4+$5, min 
}
# 运行后
END {
  printf "-------------------------------------------------\n"
  printf "MIN MATH: %6d\n", min
  printf "  TOTAL: %10d %8d %8d \n", math, english, computer
  printf "AVERAGE: %10.2f %8.2f %8.2f\n", math/NR, english/NR, computer/NR
}