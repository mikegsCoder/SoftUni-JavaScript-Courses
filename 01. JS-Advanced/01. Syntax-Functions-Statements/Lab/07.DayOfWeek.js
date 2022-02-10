function main(input){
    let day = {
        'Monday' : 1,
        'Tuesday' : 2,
        'Wednesday' : 3,
        'Thursday': 4,
        'Friday' : 5,
        'Saturday' : 6,
        'Sunday' : 7,
    }
    
    if (!dic.hasOwnProperty(input)) {
        return 'error';
    } else{
        return day[input];
    }
}