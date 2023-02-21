function F2() {
    local  retval='Using BASH Function'
    echo "$retval"
}

getval=$(F2)  
echo $getval
