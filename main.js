Vue.component('product',{
    props:{
        premiums:{
            type:Boolean,
            required:true
        }
    },
    template:`
  
        <div class="product">
            <div class="product-image">
                <img v-bind:src="image" alt="sock">
            </div>
            <div class="product-info">
                <h1>{{title }}</h1> 
                
                <p>Showing the latest product description {{descriptions}}.</p>
                 <!-- <h5 v-if='inventory > 20'>
                     InStock
                 </h5> 
                 <h5 v-else-if='inventory <=10 & inventory > 0'>Almost over few items </h5>
                 <h5 v-else > Out Of Stock</h5> -->
                 <h5 v-if='inventory'>
                     In Stock
                 </h5> 
                 <h5 v-else-if='inventory <=10 & inventory > 0'>Almost over few items </h5>
                 <h5 v-else > Out Of Stock</h5>
               <!-- <span v-if='onSale'> On Sale</span>
               <span v-else :class='{lineDec: !onSale}'> No Sale </span> -->
               <p>{{ sale }}</p>
               <p> Shipping Fee: {{ shipping}}</p>
               <product-details :details='details'></product-details>

               <div v-for='(variant, index) in variants' :key='variant.variantId' class="color-box"  
               :style='{backgroundColor: variant.variantColor }' @mouseover='updateProduct(index)'>
               </div>
                
               <button v-on:click='addToCart' :disabled='inventory===0' class='add-btn'  :class="{ disableBtn: inventory===0}">Add to cart</button>
               <button v-on:click='removeToCart' class="rm-btn">Remove to cart</button>
               
            </div>

            <div class='myDiv'>

            <h2> Review</h2>
            <p v-if='!review.length'> There are no review yet.</p>
            <ul>
            <li v-for="rev in review">
            <p> {{rev.name}}</p>
            <p> {{rev.review}}</p>
            <p> {{rev.rating}}</p>
            </li>
            </ul>
            <product-review @review-submitted='addReview'></product-review>
            </div>
            

       
            
             
                  
        </div>   `,
        data(){
            return {
            brand:'Nike',
            name:'Cotton Sock',
            descriptions:'New Sock item',
            selectedVariant:0,
            details:['80% cotton','20% polyester', 'Unisex'],
            onSale:true,
         
        variants:[
            {
                variantId:2212,
                variantColor:'Green',
                variantImage:'./assets/green.jpg',
                variantStock:0
                
            },
            {
                variantId:2211,
                variantColor:'Blue',
                variantImage:'./assets/blue.jpg',
                variantStock:20
               
            }
        ],
        review:[],
       

      
            }
        },
            methods:{
                addToCart(){
                    this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
                },
                removeToCart(){
                    this.$emit('remove-from-cart',this.variants[this.selectedVariant].variantId)
                    
                },
                updateProduct(index){
                    this.selectedVariant= index
                    //console.log(this.selectedVariant,'var')
        
                },
                addReview(productsReview){
                    this.review.push(productsReview)
                }
            },
            computed:{
                title(){
                    return this.brand + ' ' + this.name
                },
                image(){
                    return this.variants[this.selectedVariant].variantImage
                },
                inventory(){
                    return this.variants[this.selectedVariant].variantStock
                },
                sale(){
                    if(this.onSale){
                        return this.brand + ' ' + this.name + ' are on Sale !!' 
                    }
                        return this.brand +' ' + this.name + 'are not on Sale !!'
                },
                shipping(){
                    if(this.premiums){
                        return 'Free'
                    } 
                    return ' $ 100'
                }
            }
}),
 Vue.component('product-details',{
    props:{
        details:{
            type:Array,
            required:true
        }
    },
    template:`
    <div>
    <ul>
    <li v-for="detail in details">{{ detail}}</li>
</ul>
    </div>`
   
 }),
 Vue.component('product-review',{
     template:`
     <form class='review-form' @submit.prevent='onSubmit'>
     <p v-if="error.length">
     <b> Please correct the following error(s):</b>
        <ul>
        <li v-for="err in error">
        {{err}}
        </li>
        </ul>

     </p>
     <p>
     <label for='name'>Name:</label>
     <input type='text' id='name' v-model='name'/> 
     </p>
     <p>
     <label for='review'>Review:</label>
     <textarea  id='review' v-model='review'>
     </textarea> 
     </p>
     <p>
     <label for='rate'>Rating:</label>
     <select  id='rate' v-model.number='rating'>
      <option>4</option>
      <option>5</option>
      <option>3</option>
      <option>2</option>
      <option>1</option>
      </select>
     </p>
     <p>
     <b> Would you like to recommend :
     </b>
     <input type='radio'  value='Yes' v-model='recommend'>Yes</input>
     <input   type='radio' name='recommend' value='No' v-model='recommend'>No</input>
     </p>
     <p>
     <input type='submit' value='Submit'/>
     </p>
     </form>

     `,
     data(){
         return{
             name:null,
             review:null,
             rating:null,
             error:[],
             recommend:null
         }
     },
     methods:{
         onSubmit(){
             if(this.name && this.review && this.rating && this.recommend){
                let productReview={
                    name:this.name,
                    review:this.review,
                    rating:this.rating,
                    recommend:this.recommend
                 }
                 this.$emit('review-submitted',productReview)
                 this.name=null
                 this.review=null
                 this.rating=null
                 this.recommend=null
             }else{
                this.error=[]
                 if(!this.name) this.error.push('Name is required')
                 if(!this.review) this.error.push('review is required')
                 if(!this.rating) this.error.push('Rating is required')
                 if(!this.recommend) this.error.push('Recommend is required')
                 
             }
             
            
         }
     }
 })       
const app= new Vue({
    el: '#app',
    data:{
        premium:true,
        cart:[],
        
    },
    methods:{
        updateCarts(id){
            this.cart.push(id)
        },
        removeItem(id){
            for(var i = this.cart.length - 1; i>=0 ; i--){
                    if(this.cart[i] === id){
                        this.cart.splice(i,1)
                    }
            }
           
        }
    }
    
    
})
   