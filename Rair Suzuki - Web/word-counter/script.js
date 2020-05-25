$(function () {
    let timeLeft = $("#time-left");
    let textArea = $("#txt-a");
    let textRef = $("#txt-ref");
    let qtWords = $("#qt-words");
    let result = $("#result");
    let level = $("#level");
    let endMessage = $("#end-message");
    let normalButton = $("#normal");
    let hardButton = $("#hard");
    let difficultyBlock = $("#diffculty-block");
    let lvlInfo = $("#lvl-info");
    let started = false;
    let lost = false;
    let diffiChoosed = "";
    let textBackup = "";
    let strAux = "";
    let cont = 0;
    let timeSpent = 0;
    let aux2 = 0;
    let wPs = 0;
    let qtWordsAux = 0;
    let textNormal = ("Procuro algo em imagens, textos, músicas, lugares, diálogos e pessoas, tendo encontrar respostas simples, simples sentimentos, simplicidades. Mas tentar simplificar cada vez mais, torna tudo tão complexo. Seria muito mais simples complicar tudo a parar de simplificar o complicado? Simplesmente é algo muito complicado.").toLowerCase();
    let textHard = ("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla malesuada ultricies facilisis. Fusce bibendum, enim sollicitudin suscipit accumsan, sapien ligula rutrum risus, nec semper neque nibh bibendum quam. Vestibulum feugiat commodo orci dignissim iaculis. Proin vitae euismod augue, sed commodo dui. Vestibulum cursus est nec erat porttitor, in fringilla felis egestas. Vivamus ultrices, massa in imperdiet mollis, magna mauris tristique dolor, ac viverra leo massa ut dui. Etiam eget diam urna. Nullam in dui dui.").toLowerCase();



    $(".close-button").one("click", function () {
        $(".instr-block").hide();
    });

    lvlInfo.hide();
    textArea.on("click", function () {
        if ((diffiChoosed === "hard" || diffiChoosed === "normal") && started === false){
            lvlInfo.fadeIn(600, "linear");
            strAux = randomizeText((textRef.text()).toString().split(" "));
            textRef.text(strAux.join(" "));
            start();
        }
    });

    normalButton.on("click", function () {
        difficultyBlock.fadeOut(600, "linear");
        textRef.text(textNormal).hide();
        console.log(textRef.text());
        diffiChoosed = "normal";
    });

    hardButton.on("click", function () {
        difficultyBlock.fadeOut(600, "linear");
        textRef.text(textHard).hide();
        console.log(textRef.text());
        diffiChoosed = "hard";
    });


    function start(){
        if (started === false){
            started = true;
            if (lost === true){
                timeLeft.text(10);
                lost = false;
            }
            $("#time-left-p").show();
            textBackup = textRef.text();
            textRef.text(textRef.text().toString().split(" ", parseInt(qtWords.text())).join(" "));
            textRef.fadeIn(400, "linear");
            endMessage.hide();
            result.text("");
            textArea.removeAttr("readonly");
            var aux = timeLeft.text() - 1;
            window.stop1 = setInterval(function(){
                cont++;
                let stop2 = setInterval(function () {
                    if ((textArea.val().split(" ")).join() === textRef.text().toLowerCase().split(" ", parseInt(qtWords.text())).join()){  //se for igual ao n de palvras com msm conteudo
                        result.text("Voce conseguiu!");
                        timeSpent += cont;
                        cont = 0;
                        qtWordsAux += parseInt(qtWords.text());
                        reset();
                        lvlUp();
                        clearInterval(stop2);
                    }
                }, 10);
                if (aux == 0){
                    lost = true;
                    diffiChoosed = "";
                    result.text("Tempo esgotado!");
                    endMessage.fadeIn(600, "linear");
                    difficultyBlock.fadeIn(600, "linear");
                    lvlInfo.hide();
                    wPs = (qtWordsAux/timeSpent).toFixed(2); //qtWordsAux?
                    if (qtWordsAux == 0){
                        wPs = 0;
                    }
                    endMessage.text("Nível alcançado: " + level.text() + " Palavras: "+ qtWordsAux + " Velocidade: " + wPs +" palavras/seg");
                    reset();
                    resetLvl();
                    aux2 = 0;
                }
                timeLeft.text(aux--);
            }, 1000);
        }
    }

    function reset() {
        $("#time-left-p").hide();
        timeLeft.text(10);
        textArea.val("");
        textRef.text(textBackup).hide();
        textArea.attr("readonly","readonly" );
        cont = 0;
        started = false;
        clearInterval(stop1);
    }

    function lvlUp() {
        let lvlAmount = 5;
        if (diffiChoosed === "hard"){
            lvlAmount = 10;
        }
        if (level.text() < lvlAmount){
            aux2 += 2;
            level.text(parseInt(level.text()) + 1);
            qtWords.text(parseInt(qtWords.text()) + 1);
            timeLeft.text(parseInt(timeLeft.text()) + aux2);
        } else if (level.text() == lvlAmount){
            endMessage.fadeIn(600, "linear");
            difficultyBlock.fadeIn(600, "linear");
            lvlInfo.hide();
            wPs = (qtWordsAux/timeSpent).toFixed(2);
            endMessage.text("Nível alcançado: " + level.text() + " Palavras: "+ qtWordsAux + " Velocidade: " + wPs +" palavras/seg");
            result.text("Parabéns, voce venceu!");
            wPs = 0;
            qtWordsAux = 0;
            resetLvl();
            reset();
            aux2 = 0;
            diffiChoosed = "";
        }
    }

    function resetLvl() {
        level.text(1);
        qtWords.text(2);
        timeSpent = 0;
    }

    function randomizeText(array) {
        let aux = (array.sort(() => Math.random() - 0.5));
        let aux2 = [];
        aux2 = aux.map(function (item) {
            return item.toString().replace(",", "").replace(".", "");
        });
        return aux2;
    }

});

