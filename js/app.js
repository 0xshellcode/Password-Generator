(function(){ // self-call Function
    var app = document.getElementById('app'); // Acces to form thanks to id
    var charInputs = document.getElementById('num-chars');

    var conf = { // This is an object
        chars: parseInt(charInputs.value),  // parseInt convert char to int
        symbols: true,
        numbers: true,
        upperCase: true,
        lowerCase: true
    }

    var chars = {
        numbers: '0 1 2 3 4 5 6 7 8 9',
        symbols: '! @ # $ % ^ & * ( ) _ - + = { [ } ] ; : < , > . ? /',
        upperCase: 'A B C D E F G H I J K L M N O P Q R S T U V W X Y Z',
        lowerCase: 'a b c d e f g h i j k l m n o p q r s t u v w x y z'
    }

    // Events


    // Avoid event submit    
    app.addEventListener('submit', function(e){
        e.preventDefault();
    });

    app.elements.namedItem('btn-minus-one').addEventListener('click', function(){
        conf.chars--;
        charInputs.value = conf.chars; 
    });

    app.elements.namedItem('btn-plus-one').addEventListener('click', function(){
        if(conf.chars > 0){
            conf.chars++;
            charInputs.value = conf.chars; 
        }
    });
    

    app.elements.namedItem('btn-symbols').addEventListener('click', function(){
        btnToggle(this);
        conf.symbols = !conf.symbols;

    });

    app.elements.namedItem('btn-numbers').addEventListener('click', function(){
        btnToggle(this);
        conf.numbers = !conf.numbers;

    });

    app.elements.namedItem('btn-capitals').addEventListener('click', function(){
        btnToggle(this);
        conf.upperCase = !conf.upperCase;

    });


    //Generate Password

    app.elements.namedItem('btn-generate').addEventListener('click', function(){
        generatePass();

    });

    app.elements.namedItem('input-password').addEventListener('click', function(){
        copyPass();
    });

    // Functions

    function btnToggle(element){
        // this.classList.toggle('false'); this: refers to the item that was clicked
        element.classList.toggle('false');
        element.childNodes[0].classList.toggle('fa-check');
        element.childNodes[0].classList.toggle('fa-times');
    }

    function generatePass(){
        var finalChars = '';
        var password = '';

        for(property in conf){
            if(conf[property] == true){
                finalChars += chars[property] + ' ';
            }

        }
        finalChars = finalChars.trim(); // remove start and end spacing
        finalChars = finalChars.split(' ');

        for(var i = 0; i < conf.chars; i++){
            password += finalChars[Math.floor(Math.random() * finalChars.length)]; // floor() rounds off the randomly generated number by random()   
        }

        app.elements.namedItem('input-password').value = password;
    }

    function copyPass(){
        app.elements.namedItem('input-password').select();
        document.execCommand('copy');
        document.getElementById('alert-copied').classList.add('active');
        setTimeout(function(){
            document.getElementById('alert-copied').classList.remove('active');
        }, 2000);


    }

    generatePass();
    
}())