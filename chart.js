$(function(){  

    var r = new Raphael(document.getElementById('canvas_container'), 700, 700);  

    var size = [400, 400];
    var dist = [10, 40];
    var start = [40, 40];
    
    
    var x_rept = size[1]/dist[0];
    var y_rept = size[0]/dist[1];
    
    var color = 0;
    
    var lines_x = false;
    var lines_y = true;
    
    var hide_chart = function (){
            
        }; 
    
    //main area
    r.rect(start[0], start[1], size[0], size[1]).attr({'fill': "90-#bbb-#fff: 100"});
    
    //legend
    r.rect((start[0]+size[0]+50), (start[1]), 100, 100, 10).attr({'fill': "90-#eee-#fff: 100"});
    r.rect((start[0]+size[0]+60), (start[1]+10), 10, 10, 2).attr({'fill': "blue"});
   
    var legend = r.text((start[0]+size[0]+85), (start[1]+15), "test").attr({'font-size': 12}).click(hide_chart);
    
    legend.id = 'leg1';
    
    //horizontal lines
    for(var i = 0; i<y_rept+1; i++){
        
        if(i == y_rept){
           color = 'black';
        }else{
           color = 'white';
        }
        if(lines_y){
            r.path("M"+start[0]+" "+(start[1]+dist[1]*i)+" L "+(start[0]+size[0])+" "+(start[1]+dist[1]*i))
                .attr({'stroke-width': 1, 'stroke': color, 'stroke-opacity': 1,opacity: 1});    
        }
        
        r.text((start[0]-20), (start[1]+dist[1]*i), (size[0] - dist[1]*i));
    
    }
    
    //vertical lines
    for(var j = 0; j<x_rept+1; j++){
        
        if(j == 0){
           color = 'black';
        }else{
           color = 'white';
        }
        
        if(lines_x){
              r.path("M"+(start[1]+dist[0]*j)+" "+start[1]+" L "+(start[1]+dist[0]*j)+" "+(start[1]+size[1]))
                .attr({'stroke-width': 1, 'stroke': color, 'stroke-opacity': 1,opacity: 1});   
        }
        
        //scales
        r.path("M"+(start[1]+dist[0]*j)+" "+(start[1]+size[1]+5)+" L "+(start[1]+dist[0]*j)+" "+(start[1]+size[1]))
         .attr({'stroke-width': 1, 'stroke': 'black' , 'stroke-opacity': 1, opacity: 1});   
            
        r.text((start[1]+dist[0]*j), size[1]+start[1]+20, (dist[0]*j)).transform("r270");
    
    }
    
    var start_point = [start[0], (start[1]+size[1])];
    
    
    show_label = function (){
      
      var pos_x = 0;
      var pos_y = 0;

      if(this[0].nodeName == 'rect'){
            
            var id = this[0].id.substr(3);

      }else{
            
            var id = this[0].id.substr(7);

      }
      
      if(id){
            
            var elm = document.getElementById('cir'+id);
            
            pos_x = parseInt(elm.cx.baseVal.value);
            pos_y = parseInt(elm.cy.baseVal.value);
            
        //label   

        line = r.path("M "+(pos_x-10)+" "+start[1]+" L "+(pos_x-10)+" "+(size[1]+start[1]))
                .attr({opacity: 0})
                .animate({opacity: 0}, 500)
                .hover(show_label,hide_label);
        
        title = r.text((pos_x+5), (pos_y+10),
                        ''+(pos_x-start_point[0])+','+(start_point[1]-pos_y)+'')
                .attr({'text-anchor': 'start'})
                .animate({opacity: 1}, 500); 
          
          
        c = r.rect(pos_x, pos_y, title.getBBox().width+5, 20, 5)
             .attr({fill: "#eee", 'fill-opacity': 0.5, opacity: 0})
             .animate({opacity: 0.6}, 500);
      }
      
          
    };

    hide_label = function (){
        
        if(c)
                c.animate({opacity: 0}, 200, function(){
                    this.remove();
                });
        if(line)
                line.animate({opacity: 0}, 100, function(){
                    this.remove();
                });
               
        if(title)       
                title.animate({opacity: 0}, 200, function(){
                    this.remove();
                });
    };
    
    //ponints sets
    var x = [10, 20, 40, 50, 70, 100, 120, 130, 150, 160, 200, 250, 370];
    var y = [10, 50, 20, 30, 120, 125, 140, 150, 120, 110, 270, 200, 13.5];
    
    var sx, sy;
    var strokes = [];
    for(i = 0; i < x.length; i++){
        
       if(isNaN(y[i-1])){
           y[i-1] = 0;
           x[i-1] = 0;
       }
        
       if(i == x.length-1){
           x_next = size[0]+start[0]-(x[1]-x[0])/2;
       }else{
           x_next = x[i+1];
       }
       
       if(i == 0){
           sx = start_point[0];
           sy = start_point[1];
           
           s_rect = sx+x[i-1];
           w_rect = (x[i]-x[i-1])+(x_next-x[i])/2;
           
       }else{
           
           sy = start_point[1]-y[i-1];
           s_rect = sx+x[i-1]+(x[i]-x[i-1])/2;
           w_rect = (x[i]-x[i-1])/2+(x_next-x[i])/2;
       
   }

       strokes.push({stroke: "M "+(sx+x[i-1])+" "+sy+" L "+(sx+x[i])+" "+(start_point[1]-y[i]),
                    time : 100,
                    x: sx+x[i],
                    y: start_point[1]-y[i]});

              var block = r.rect(s_rect, start[1], w_rect, 400)
                    .attr({'fill': 'red', opacity: 0})
                    .hover(show_label,hide_label);
         
       block[0].id = 'rec'+i;
   

    }  


        var drawnPath = strokes[0].stroke;

        var myPath = r.path(drawnPath);
        
        myPath.attr({'stroke-width': 3,'stroke-miterlimi': 10, 'opacity': 0.9, 'stroke': 'blue'});
        
        var cir = r.circle(strokes[0].x, strokes[0].y, 4)
                .attr({fill: "blue", 'fill-opacity': 1, opacity: 0, 'stroke-opacity': 0})
                .animate({opacity: 1}, 500);
                
        cir[0].id = 'cir0';   
        
        cir_outer = r.circle(strokes[0].x, strokes[0].y, 10)
                     .attr({'stroke-opacity': 0, fill: 'blue', 'fill-opacity': 0})
                     .hover(show_label,hide_label);
         
        cir_outer[0].id = 'cir_out0';
         
        var section = 1;

        animatePath();
        
        if (opts.shade) {
            shades[i].attr({ path: path.concat(["L", X, y + height, "L",  x + ((valuesx[i] || valuesx[0])[0] - minx) * kx, y + height, "z"]).join(",") });
        }

        function animatePath() {

            if (section < strokes.length) {
                cir = r.circle(strokes[section].x, strokes[section].y, 4)
                        .attr({fill: "blue", 'fill-opacity': 1, opacity: 0,'stroke-opacity': 0})
                        .animate({opacity: 1}, 500);

                cir[0].id = 'cir'+section;

                cir_outer = r.circle(strokes[section].x, strokes[section].y, 10)
                             .attr({'stroke-opacity': 0, fill: 'blue', 'fill-opacity': 0})
                             .hover(show_label,hide_label);

                cir_outer[0].id = 'cir_out'+section;

                drawnPath += strokes[section].stroke;

                if(section == strokes.length-1){
                    drawnPath += " Z";
                }

                myPath.animate({
                    path: drawnPath
                }, strokes[section].time, animatePath);
                section++;
            }
            
        };

});