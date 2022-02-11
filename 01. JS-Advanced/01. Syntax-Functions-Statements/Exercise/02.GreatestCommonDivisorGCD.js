function solve(a,b) {
    while (a != b) {
       if (a > b) {
           a = a - b;
           
       } else {
        b = b - a;
       }
    }

    console.log(a);
}

solve(2154, 458);