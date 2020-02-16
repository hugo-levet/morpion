//TODO diagonale haut vers bas fonctionne pas pour win
// apres égalité on peut plus jouer

(function() {

    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    let lastPlayer = "O";
    let nbrCaseTouch = 0;

    class Morpion
    {
        constructor(nbrRow, nbrCol, elmt)
        {
            this.nbrRow = nbrRow;
            this.nbrCol = nbrCol;
            lastPlayer = "O";
            nbrCaseTouch = 0;

            //create row
            for(let y = 0; y < nbrRow; ++y)
            {
                elmt.append($('<div class="row">'));
            }

            //create cases per row
            for(let x = 0; x < nbrCol; ++x)
            {
                $('.row').append($('<div class="case">'));
            }

            //add coords
            for(let x = 0; x < 8; ++x)
            {
                for(let y = 0; y < 8; ++y)
                {
                    $('.row:nth-child('+y+') .case:nth-child('+x+')').data('x', x);
                    $('.row:nth-child('+y+') .case:nth-child('+x+')').data('y', y);
                }
            }

            $('.case').click(function(){
                if($(this).html() != "X" && $(this).html() != "O")
                {
                    nbrCaseTouch += 1;
                    if(lastPlayer == "O")
                    {
                        $(this).html('X');
                        $(this).addClass('croix');
                        lastPlayer = "X";
                        $('p').html('Pose ton meilleur rond');
                        $('p').css('color', '#254E70');
                    }
                    else
                    {
                        $(this).html('O');
                        $(this).addClass('rond');
                        lastPlayer = "O";
                        $('p').html('Pose ta meilleur croix');
                        $('p').css('color', '#37718E');
                    }

                    if(nbrCaseTouch == 9 && !testWin()){
                        $('p').html('Pff... bravo.. y\'a égalité ...');
                        $('p').css('color', '#C33C54');
                        $('button').css('display', 'block');
                        $('.case').off();
                    }
                    else if(testWin())
                    {
                        $('.case').off();
                        let wimSentence = 'Bravo le joueur avec les ';
                        if(lastPlayer == 'X')
                        {
                            wimSentence += 'X';
                        }
                        else
                        {
                            wimSentence += 'O';
                        }
                        wimSentence += ' à gagné !'
                        $('p').html(wimSentence);
                        $('p').css('color', 'yellow');
                        $('#replay').css('display', 'block');
                    }
                }
                else
                {
                    alert('T\'es sur de savoir jouer au morpion ?');
                }
            });
        }
    }

    function testWin()
    {
        //test column win
        for(let i = 0; i < 3; i++)
        {
            if($('.case').eq(i).html() != '')
            {
                if(($('.case').eq(i).html() == $('.case').eq(i+3).html()) && ($('.case').eq(i).html() == $('.case').eq(i+6).html()))
                {
                    return true;
                }
            }
        }

        //test row win
        for(let i = 0; i < 3; i++)
        {
            if($('.case').eq(i*3).html() != '')
            {
                if(($('.case').eq(i*3).html() == $('.case').eq(i*3+1).html()) && ($('.case').eq(i*3).html() == $('.case').eq(i*3+2).html()))
                {
                    return true;
                }
            }
        }

        //test diagonal win
        if($('.case').eq(6).html() != '')
        {
            if(($('.case').eq(6).html() == $('.case').eq(4).html()) && ($('.case').eq(6).html() == $('.case').eq(2).html()))
            {
                console.log('1');
                return true;
            }
        }
        else if($('.case').eq(0).html() != '')
        {
            if(($('.case').eq(i*3).html() == $('.case').eq(4).html()) && ($('.case').eq(i*3).html() == $('.case').eq(8).html()))
            {
                console.log('2');
                return true;
            }
        }
        else
        {
            return false;
        }
    }

    //wait jquery
    $(document).ready(function() {
        morpion = new Morpion(3, 3, $('#plateau'));
        
        $('#replay').click(function(){
            $('#replay').css('display', 'none');
            $('#plateau').empty();
            morpion = new Morpion(3, 3, $('#plateau'));
        });
    });
})();