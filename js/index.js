/// <reference types="jquery"/>


let search_bt=document.getElementById("search");
let category_bt=document.getElementById("category")
let area_bt=document.getElementById("area")
let ingredients_bt=document.getElementById("Ingredients")
let contact_bt=document.getElementById("contact-us")


let searchName_input=null;

let Letter_input=null;

let food_container=document.getElementById("food");

var food_array=[];



contact_bt.onclick=function(){

    $("#searchContainer").addClass('d-none')
     document.getElementById("middle").innerHTML=`<i class="fa fa-align-justify fa-2x" id="open"></i>`
     toogle_nav();
    $(".side-nav").animate({width:'toggle',paddingInline:'toggle'},500,function(){
        
        
    })
    $(".inside ul li").animate({top:'300px'},500)

    food_container.innerHTML=`

    `

    document.getElementById("contact").classList.replace('d-none','d-flex');
    validate();


}
$(function(){

    $('.loading .loader').fadeOut(500,function(){

        $('.loading').fadeOut(500,function(){

            $('body').css({'overflow-y': 'auto'})
        });
        

    });

})


search_bt.onclick=function(){

    document.getElementById("contact").classList.replace('d-flex','d-none')
    $("#searchContainer").removeClass('d-none')

    searchName_input= document.getElementById("serachname")

    Letter_input=document.getElementById("searchletter")
    

    
    searchName_input.value=""
    Letter_input.value="";



    document.getElementById("middle").innerHTML=`<i class="fa fa-align-justify fa-2x" id="open"></i>`
    toogle_nav();

    $(".side-nav").animate({width:'toggle',paddingInline:'toggle'},500,function(){
        
        
    })
    $(".inside ul li").animate({top:'300px'},500)



      document.getElementById("food").innerHTML=`


      `

      search();
}

function search(){


    searchName_input.oninput=async function(){


       

        let val=searchName_input.value;
        
        $('.inner-loading').fadeIn(200,async function(){
            
            let this_array=await query_search('s',val);
            
            
                   food_container.innerHTML=`
            
            
                   `
    

                   if(this_array!=null){
      
                       show_data(this_array)
                       click_card();
                   }
         $('.inner-loading').fadeOut(200,function(){
             


             

         })

     

 });

}


   Letter_input.oninput=async function(){

       let val=Letter_input.value;

      food_container.innerHTML=`


       `

       $('.inner-loading').fadeIn(200,async function(){
           
           let this_array=await query_search('f',val);

           food_container.innerHTML=`
            
            
           `
           if(this_array!=null){

               show_data(this_array)
               click_card();
           }
           

            $('.inner-loading').fadeOut(200,function(){
                



            })

    
    });

   }

}

async function query_search(query,input){

    try{

        var response=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?${query}=${input}`);
 
        var data=await response.json();


        var this_recipe=data.meals
 

        return this_recipe
      
    
       
     }
 
 
     catch(err){
 

         console.log(err)
 
     }
}



category_bt.onclick=async function(){

    document.getElementById("contact").classList.replace('d-flex','d-none')

    $("#searchContainer").addClass('d-none')

    document.getElementById("middle").innerHTML=`<i class="fa fa-align-justify fa-2x" id="open"></i>`
    toogle_nav();

    $(".side-nav").animate({width:'toggle',paddingInline:'toggle'},500,function(){
        
        
    })
    $(".inside ul li").animate({top:'300px'},500)

    food_container.innerHTML=`


    `

    
    $('.inner-loading').fadeIn(200,async function(){
        
        var this_array=await get_by_category(true);
       
        show_categories(this_array);

            $('.inner-loading').fadeOut(200,function(){
                
                click_category_card();

            })

        

    });

    
   
}

async function get_by_category(all,category=""){


    let this_category=[];
    var url="";


    if(all){

        url=`https://www.themealdb.com/api/json/v1/1/categories.php`
    }

    else{

        url=`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
    }

    try{

        var response=await fetch(url);
 
        var data=await response.json();

  
        if(all){
            this_category=data.categories

        }
        
        else{
            
            this_category=data.meals
        }
 
        return this_category
    
       
     }
 
 
     catch(err){
 
        console.log(err)
 }



}


function click_category_card(){


    $(".item").click(async function(){
      
    document.getElementById("searchContainer").classList.add('d-none')


        
    var category_name=this.dataset.name; 

    food_container.innerHTML=`


    `



    $('.inner-loading').fadeIn(200,async function(){

    var this_array=await get_by_category(false,category_name);


    show_data(this_array);
    $('.inner-loading').fadeOut(200,function(){


        click_card();

    })

        

    });
    })


}


function show_categories(this_array){

    var cartonna=``


    for(var i=0 ; i<this_array.length ; ++i){

        var descrption=this_array[i].strCategoryDescription.split(' ')

        cartonna=cartonna+`
                    
         <div class="item  col-md-3 "  data-id="${this_array[i].idCategory}" data-name='${this_array[i].strCategory}'>
                <div class="card  border-0 overflow-hidden" >
                    <img src='${this_array[i].strCategoryThumb}' class="card-img-top rounded" alt="...">
                    

                                <div class="layer-cat p-2">

                               <h3 class="ps-2">${this_array[i].strCategory
                               }</h3> 

                               <p>${descrption.slice(0,20).toString().replace(/,([^,])/g, ' $1').replace(/,,/g, ', ')}</p>

                    </div>
                  
                  </div>

                     </div>
        
        `
        
    }

    document.getElementById("food").innerHTML=cartonna

}




area_bt.onclick=async function(){

    document.getElementById("contact").classList.replace('d-flex','d-none')
    $("#searchContainer").addClass('d-none')
    document.getElementById("middle").innerHTML=`<i class="fa fa-align-justify fa-2x" id="open"></i>`
    toogle_nav();

    $(".side-nav").animate({width:'toggle',paddingInline:'toggle'},500,function(){
        
        
    })
    $(".inside ul li").animate({top:'300px'},500)



    food_container.innerHTML=`


    `


    $('.inner-loading').fadeIn(200, async function(){
        
        var areas=await get_area(true);
        show_areas(areas);
       
        $('.inner-loading').fadeOut(200,function(){

            click_area_card();
  

        })

    

});



}

function show_areas(this_array){



    var cartonna=``

    console.log(food_array.length)
    for(var i=0 ; i<this_array.length ; ++i){


        cartonna=cartonna+`
                    
         <div class="item col-md-3 "  data-name="${this_array[i].strArea}">
                <div class="card border-0 overflow-hidden text-center text-white" >
                   
                <i class="fa-solid fa-house-laptop fa-4x"></i>

                <h3>${this_array[i].strArea}</h3>
                    

                  
                  </div>

                     </div>
        
        `
        
    }

    document.getElementById("food").innerHTML=cartonna


}


function click_area_card(){


    
    $(".item").click(async function(){
      


        document.getElementById("searchContainer").classList.add('d-none')



        var area_name=this.dataset.name;


        food_container.innerHTML=`


        `
    
        
        
        
        
        $('.inner-loading').fadeIn(200,async function(){
            
            var this_array=await get_area(false,area_name);
       
            show_data(this_array);

            $('.inner-loading').fadeOut(200,function(){
    
    
                

      
                click_card();
    
            })
    
        
    
    });
    
    

    })



}
async function get_area(all,area="list"){

    
    var all_areas=[];

    var url=` `

    if(all){


        url=`https://www.themealdb.com/api/json/v1/1/list.php?a=${area}`

    }

    else{

        url=`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
    }


    try{


        var response=await fetch(url);
 
        var data=await response.json();
 

        all_areas=data.meals

        return all_areas
 
     }
 
 
     catch(err){
 
         console.log(err)
     }


}





ingredients_bt.onclick=async function(){


    document.getElementById("contact").classList.replace('d-flex','d-none')

    $("#searchContainer").addClass('d-none')
     document.getElementById("middle").innerHTML=`<i class="fa fa-align-justify fa-2x" id="open"></i>`
     toogle_nav();

     $(".side-nav").animate({width:'toggle',paddingInline:'toggle'},500,function(){
        
        
     })
     $(".inside ul li").animate({top:'300px'},500)



     food_container.innerHTML=`


     `
 

    $('.inner-loading').fadeIn(200,async function(){
        
        var ingredients=await get_ingredients(true);
       
        show_ingredients(ingredients)

        $('.inner-loading').fadeOut(200,function(){
    
                                 
                    click_ingredient_card();
                
        })

    

});




}


async function get_ingredients(all,ingredients="list"){


     
    var all_ingredients=[];

    var url=` `

    if(all){


        url=`https://www.themealdb.com/api/json/v1/1/list.php?i=${ingredients}`

    }

    else{

        url=`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`
    }


    try{


        var response=await fetch(url);
 
        var data=await response.json();
 

        all_ingredients=data.meals.slice(0,20)
 
        return all_ingredients
       
     }
 
 
     catch(err){

         console.log(err)
     }

}


function show_ingredients(this_array){



    var cartonna=``


    for(var i=0 ; i<this_array.length ; ++i){

        var descrption=this_array[i].strDescription.split(' ')
    
        cartonna=cartonna+`
                    
         <div class="item col-md-3 "  data-name="${this_array[i].strIngredient}">
                <div class="card text-center border-0 overflow-hidden text-center text-white" >
                   
              <i class="fa-solid fa-drumstick-bite fa-4x"></i>

                <h3>${this_array[i].strIngredient}</h3>


                      <p>${descrption.slice(0,20).toString().replace(/,([^,])/g, ' $1').replace(/,,/g, ', ')}</p>


                  
                  </div>

                     </div>
        
        `
        
    }

    document.getElementById("food").innerHTML=cartonna

}

function click_ingredient_card(){

    $(".item").click(async function(){
      


        document.getElementById("searchContainer").classList.add('d-none')

        
        var ingredient_name=this.dataset.name; 

        food_container.innerHTML=`


        `
    
        
        
        $('.inner-loading').fadeIn(200,async function(){
            
            var this_array=await get_ingredients(false,ingredient_name);
       
            show_data(this_array);               

            $('.inner-loading').fadeOut(200,function(){
      
                        click_card();
    
            })
    
    });
        

    })

}





async function get_clicked(id){

    let this_recipe=[];

    try{


        var response=await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
 
        var data=await response.json();

       
        this_recipe=data.meals;

        return this_recipe;

       
     }
 
 
     catch(err){
 
         console.log(err)

     }

}



function get_recipes(index){


    let full_array=[];

    for(var i=1 ; i<=20 ; ++i){
        let x='strMeasure'+`${i}`;
        let y='strIngredient'+`${i}`;


        if(food_array[index][y]==''){
            break;
        }

        else{
            full_array.push(food_array[index][x] + ' ' + food_array[index][y] )

        }

    }

    return full_array;


}





function show_data(this_array){

    var cartonna=``

    console.log(food_array.length)
    for(var i=0 ; i<this_array.length ; ++i){

        cartonna=cartonna+`
                    
         <div class="item col-md-3 "  data-id="${this_array[i].idMeal}">
                <div class="card border-0 overflow-hidden" >
                    <img src='${this_array[i].strMealThumb}' class="card-img-top rounded" alt="${this_array[i].strMeal} image">
                    

                <div class="layer">

                <h3 class="ps-2">${this_array[i].strMeal}</h3> 

                    </div>
                  
                  </div>

                     </div>
        
        `
        
    }
    document.getElementById("food").innerHTML=cartonna

}

function toogle_nav(){

    $("#open").click(function () {

        
        console.log("ser")

        var opened=false;
    

        if(document.getElementById("open").classList.contains("fa-align-justify")){

            document.getElementById("middle").innerHTML=`<i class="fa fa-times fa-2x" id="open"></i>`

         
            opened=true;

        }
    
        else{
    
             document.getElementById("middle").innerHTML=`<i class="fa fa-align-justify fa-2x" id="open"></i>`
           
            opened=false;
        }
    
    
        $(".side-nav").animate({width:'toggle',paddingInline:'toggle'},500,function(){
    
            
        })
        if(opened){

            $(".inside ul li").animate({top:'0px'},800)
        }

        else{
            console.log("up")
            $(".inside ul li").animate({top:'300px'},500)

        }


        toogle_nav();

      })

}



function click_card(){

    $(".card").click(async function(){
    
        document.getElementById("searchContainer").classList.add('d-none')
        var id=this.parentElement.dataset.id;


        
    food_container.innerHTML=`


    `
        var this_array=await get_clicked(id);

        $('.inner-loading').fadeIn(200,function(){

    
            var tags=function(){

                if(this_array[0].strTags==null)
                    return ' '
                
                else{
                    
                    return `<li class="alert alert-danger m-2 p-1">${this_array[0].strTags || ' ' } </li>`
                }
    
            }


            food_container.innerHTML=`
    
    
    
            <div class="row details text-white p-3">
    
            
                <div class="col-md-4 text-white">
    
                    <img class="w-100 rounded-3" src="${this_array[0].strMealThumb}" alt="">
                    <h2>${this_array[0].strMeal}</h2>
    
                </div>
            
                 <div class="col-md-8 text-white">
    
            <h2>Instructions</h2>
            <p>${this_array[0].strInstructions}</p>
    
    
             <h3><span class="fw-bolder">Area : </span>${this_array[0].strArea}</h3>
                    <h3><span class="fw-bolder">Category : </span>${this_array[0].strCategory}</h3>
               <h3>Recipes :</h3>
    
    
            <ul class="list-unstyled d-flex g-3 flex-wrap">
                   
    
            ${get_recipes(0).map(function(ele){
    
                return `<li class='alert alert-info m-2 p-1'>${ele}</li>`
            }).toString().replaceAll(",","")}
                    </ul>
       
    
                    <h3>Tags :</h3>
                    <ul class="list-unstyled d-flex g-3 flex-wrap">
                        
              
                    ${tags()}
        
    
                  </ul>
    
                    <a target="_blank" href="${this_array[0].strSource}" class="btn btn-success">Source</a>
                    <a target="_blank" href="${this_array[0].
                        strYoutube}" class="btn btn-danger">Youtube</a>
    
            
    
                    </div>
            
            </div>
            
            
            `
            $('.inner-loading').fadeOut(200,function(){
                
                    
                
          
            })  
    });


    })

}



async function get_data(){


    try{
    
            var response=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
    
            var data=await response.json();
    

            food_array=data.meals
            show_data(food_array);

      
    }


    catch(err){



        console.log(err)


    }
}



let namevalid=false;
let emailvalid=false;
let phonevalid=false;
let passwordvalid=false;
let agevalid=false;
let repasswordvalid=false;

function validate(){



    document.getElementById("nameInput").oninput=function(){

        var exp= /^[a-zA-Z]+$/

        var value=document.getElementById("nameInput").value


      
        if(exp.test(value)==false){

          
            document.getElementById("nameAlert").classList.replace('d-none','d-flex')
            namevalid=false;
        }

        else{

           
            namevalid=true;

            document.getElementById("nameAlert").classList.add("d-none")

        }

        checkvalid()
    }

    document.getElementById("emailInput").oninput=function(){


        var exp= /\S+@\S+\.\S+/; 

        var value=document.getElementById("emailInput").value


        if(exp.test(value)==false){

          
            emailvalid=false;
            document.getElementById("emailAlert").classList.replace('d-none','d-flex')
        }

        else{

           
            emailvalid=true;
            document.getElementById("emailAlert").classList.add("d-none")

        }

        checkvalid()

    }


    document.getElementById("phoneInput").oninput=function(){


        var exp=/^\d{10,}$/;

        var value=document.getElementById("phoneInput").value


       
        if(exp.test(value)==false){

    
            phonevalid=false;
            document.getElementById("phoneAlert").classList.replace('d-none','d-flex')
        }

        else{

          
            phonevalid=true;
            document.getElementById("phoneAlert").classList.add("d-none")

        }

        checkvalid()

    }


    
    document.getElementById("ageInput").oninput=function(){


    

        var value=document.getElementById("ageInput").value


        
        if(value<=0){

           agevalid=false;
            document.getElementById("ageAlert").classList.replace('d-none','d-flex')
        }

        else{

        
            agevalid=true;
            document.getElementById("ageAlert").classList.add("d-none")

        }

        checkvalid()

    }


    document.getElementById("ageInput").onfocus=function(){



        window.onkeydown=function(){

            var value=document.getElementById("ageInput").value
        

            if(!event.code.toString().startsWith("D") &&  ! value>0 ){

                agevalid=false;
                document.getElementById("ageAlert").classList.replace('d-none','d-flex')
            }

            else{


                agevalid=true;
                document.getElementById("ageAlert").classList.add("d-none")
    
            }

            console.log(event.code.toString().startsWith("D"))

        }

        checkvalid()

    }



    document.getElementById("passwordInput").oninput=function(){


    

        var value=document.getElementById("passwordInput").value

        const exp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

       
        
        if(!exp.test(value) && value.length<8){

            passwordvalid=false;
           
            document.getElementById("passwordAlert").classList.replace('d-none','d-flex')
        }

        else{

            passwordvalid=true;
           
            document.getElementById("passwordAlert").classList.add("d-none")

        }

        checkvalid()
    }



    document.getElementById("repasswordInput").oninput=function(){


    

        var passvalue=document.getElementById("passwordInput").value;
        var value=document.getElementById("repasswordInput").value

        
        
        if(passvalue!=value){

            repasswordvalid=false;
           
            document.getElementById("repasswordAlert").classList.replace('d-none','d-flex')
        }

        else{

            repasswordvalid=true;
            document.getElementById("repasswordAlert").classList.add("d-none")

        }

        checkvalid()
    }

    
    
    
    
}


function checkvalid(){
    
    
    var valid=namevalid && emailvalid && agevalid && passwordvalid && repasswordvalid && phonevalid
    console.log(valid)
    
    if(valid){
        console.log("pp")
        document.getElementById("submitBtn").removeAttribute("disabled")
    }
    
    else{
        console.log("ppsssss")
    
        document.getElementById("submitBtn").setAttribute("disabled", ' ')
    
    
    }

}

async function main(){

    await get_data();
    toogle_nav();
    click_card();
    
}

main();