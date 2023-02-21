choice() {
    PS3="Select depoy env please: "

    select env in dev env
    do
        case $env in 
            "dev")
                echo "$env - deploy to dev"
                break;;
            "test")
                echo "$env - deploy to test"
                break;;
        esac
    done

#    return "$env"
return 1
}

choice

echo $?
