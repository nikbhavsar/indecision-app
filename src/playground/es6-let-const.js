const getFirstName = (name) => {
    if(name){
        const firstName = name.split(' ')[0];
        return firstName;
    }
}