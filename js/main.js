(function(){
    'user strict'

    var price = document.getElementById("price");
    var num = document.getElementById("num");
    var unit = document.getElementById("unit");
    var btn = document.getElementById("btn");
    var reset = document.getElementById("reset");
    var result = document.getElementById("result");

    function checkInput(){
        ///^[1-9][0-9]*$/
        if(price.value.match(/^[1-9][0-9]*$/) && num.value.match(/^[1-9][0-9]*$/)){
            btn.classList.remove("disabled");
        }else{
            btn.classList.add("disabled");
        }
    }
    

    btn.addEventListener('click',function(){
        //A.PayLess 1000 一人300円 100円不足(short)
        //B.PayMore 1000 一人400円 200円あまり(over)
        var payLess;
        var short;
        var payMore;
        var over;
        var str;
        
        if(this.classList.contains("disabled") === true){
            return;
        }

        payLess = Math.floor(price.value/num.value/unit.value)*unit.value;
        short = price.value-(payLess*num.value);
        payMore = Math.ceil(price.value/num.value/unit.value)*unit.value;
        over = Math.abs(price.value-(payMore*num.value));
        
        if(short===0 && over===0){
            str = '一人' + (price.value/num.value) + '円ちょうどです！';
        }else{
            str = '一人' + payLess + '円だと' + short + '円足りません。'+ 
                '一人' + payMore + '円だと' + over + '円余ります。';
        }

        result.textContent = str;
        reset.classList.remove('hidden');

    });
    price.addEventListener('keyup',checkInput);
    num.addEventListener('keyup',checkInput);

    reset.addEventListener("click",function(){
        price.value='';
        num.value='';
        unit.value="100";
        result.textContent='ここに結果を表示します。';
        btn.classList.add('disabled');
        this.classList.add('hidden');
        price.focus();
    });
    price.focus();
})();