$(function(){
    /*obj save the initial position of each box*/ 
    var divinfo={"initial":[]};
    var current = -1;
    //box index

    $('#littleBoxs > div').each(function(){
        var $this = $(this);
        var initial ={
            'index' : $this.index(),
            'top'   : $this.css('top'),
            'left'  : $this.css('left')
        };
        divinfo.initial.push(initial);
    });

    $('#littleBoxs a').bind('click',function(e){
        var $this = $(this);
        var $currentBox = $this.parent();
        $currentBox.css('z-index','1');
        
        if(current == $currentBox.index()){
        //put it back
            $currentBox.stop().animate({
                'top' : divinfo.initial[$currentBox.index()].top,
                'left':divinfo.initial[$currentBox.index()].left,
                'width':"150px",
                'height':'150px'
            },800,'easeOutBack').find('.boxcontent').fadeOut();

            $('#littleBoxs > div').not($currentBox).each(function(){
                var $ele = $(this);
                var eleTop = divinfo.initial[$ele.index()].top;
                var eleLeft = divinfo.initial[$ele.index()].left;
                $ele.stop().show().animate({
                    'top'  : eleTop,
                    'left' : eleLeft,
                    'opacity':1
                },800);
            });
            current = -1;
        }
        else{
            $('#littleBoxs > div').not($currentBox).each(function(){
                var $ele = $(this);
                $ele.stop().animate({
                    'top'   :(Math.floor(Math.random()*800)-200) + 'px',
                    'left'  :(Math.floor(Math.random()*800)-200) +'px',
                    'opacity' : 0
                },800,function(){
                    $(this).hide();
                });
            });

            var newwidth = 620;
            var newheight = 620;
            $currentBox.stop().animate({
                'top'   : '0px',
                'left'  : '0px',
                'width' : newwidth + 'px',
                'height' : newheight + 'px'
            },800,'easeOutBack',function(){
                current = $currentBox.index();
                $(this).find('.boxcontent').fadeIn();
            });
        }
        e.preventDefault();
    });
});