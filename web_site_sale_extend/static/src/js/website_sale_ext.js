$(document).ready(function () {
function malformedJSON2Array (tar) {   
    var dict = {}
    tar = tar.replace(/^\{|\}$/g,'').split(',');
    for(var i=0,cur,pair;cur=tar[i];i++){
        var pair = cur.split(':');
        dict[pair[0].trim()] = pair[1].trim();
    }
    return dict;
}

$('.oe_website_sale').each(function () {
    var oe_website_sale = this;
    
    $(oe_website_sale).find('#cart_products').find('tbody tr').each(function () {
        var prod = $(this).find('strong').text();
        stock = $(this).find('#stock_available_line').text();
        value = parseInt($(this).find('input.js_quantity').val(), 10);
        if(value>parseInt(stock))
    {        
        showDialog('Error','You can\'t enter more than Available Quanity ('+parseInt(stock)+' for product : '+prod+') .','error',5);
        $( "div.oe_cart a.btn-primary" ).addClass("disabled");        
        return false;
    }
    else
    {
        $( "div.oe_cart a.btn-primary" ).removeClass("disabled");
    }
        });
    
    $( "input[name='add_qty']" ).addClass('tooltipt');
    var stock = $( "span[name='stock_available']" ).text();
    
    if(stock!='' && stock !=NaN && stock!=undefined)
    {
        if(stock<=0)
        {
             $( ".fa-plus" ).addClass('hidden');
             $( ".fa-minus" ).addClass("hidden");
             $( "input[name='add_qty']" ).prop("readonly",true);
        }
        else{
            $( "i.fa-plus" ).removeClass("hidden");
            $( "i.fa-minus" ).removeClass("hidden");
            $( "input[name='add_qty']" ).prop("readonly",false);
        }
    }
    
 $(oe_website_sale).on("change", "div.css_quantity input.js_quantity", function () {
        var $input = $(this);
        var value = parseInt($input.val(), 10);
        var stock = $( "span[name='stock_available']" ).text();
        var variant_qty = $( "#qty_avail_variant" ).attr('value');
	  if(variant_qty==undefined){    
	    if(value>stock)
	    {        
		showDialog('Error','You can\'t enter more than Available Quanity ('+parseInt(stock)+').','error',4);
		$( "#add_to_cart" ).addClass("disabled");
	    }
	    else
	    {
		$( "#add_to_cart" ).removeClass("disabled");
	    }
	  }
	    
	    if(variant_qty!=undefined){
		if(variant_qty>0){
		    if(value>variant_qty)
		    {     
			showDialog('Error','You can\'t enter more than Available Quanity ('+parseInt(variant_qty)+').','error',4);
			$( "#add_to_cart" ).addClass("disabled");
		    }
		    else
		    {
			$( "#add_to_cart" ).removeClass("disabled");
		    }
		  }
		  else if(variant_qty<=0){
		    $( "#add_to_cart" ).addClass("disabled");    
		  }
	    }
    
  });  
  
$(oe_website_sale).on("change", "table#cart_products input.js_quantity", function () {
        var $input = $(this);
        var value = parseInt($input.val(), 10);
        var line_id = parseInt($input.data('line-id'),10);
        var product_id = parseInt($input.data('product-id'),10);
        var stock = $( "span[name='stock_available_line'][data-line-id="+line_id+"]" ).text();
        if(value>stock)
    {        
        showDialog('Error','You can\'t enter more than Available Quanity ('+parseInt(stock)+').','error',4);
        $( "div.oe_cart a.btn-primary" ).addClass("disabled");
        return false;
    }
    else
    {
        $( "div.oe_cart a.btn-primary" ).removeClass("disabled");
    }
    $input.closest('#cart_products').find('tbody tr').each(function () {
        var prod = $(this).find('strong').text();
        stock = $(this).find('#stock_available_line').text();
        value = parseInt($(this).find('input.js_quantity').val(), 10);
        if(value>parseInt(stock))
    {        
        showDialog('Error','You can\'t enter more than Available Quanity ('+parseInt(stock)+' for product : '+prod+') .','error',5);
        $( "div.oe_cart a.btn-primary" ).addClass("disabled");
        return false;
    }
    else
    {
        $( "div.oe_cart a.btn-primary" ).removeClass("disabled");
    }
        });
  });
  $('div.oe_cart a.btn-primary', oe_website_sale).off('click').on('click', function () {

  $(oe_website_sale).find('#cart_products').find('tbody tr').each(function () {
        var prod = $(this).find('strong').text();
        stock = $(this).find('#stock_available_line').text();
        value = parseInt($(this).find('input.js_quantity').val(), 10);
        if(value>parseInt(stock))
    {        
        showDialog('Error','You can\'t enter more than Available Quanity ('+parseInt(stock)+' for product : '+prod+') .','error',5);
        $( "div.oe_cart a.btn-primary" ).addClass("disabled");        
        return false;
    }
    else
    {
        $( "div.oe_cart a.btn-primary" ).removeClass("disabled");
    }
        });
      
  });
  
    $(oe_website_sale).on('change', 'input.js_variant_change, select.js_variant_change', function (ev) {
        var $ul = $(this).parents('ul.js_add_cart_variants:first');
        var $parent = $ul.closest('.js_product');
        var $product_id = $parent.find('input.product_id').first();
        var $price = $parent.find(".oe_price:first .oe_currency_value");
        var $default_price = $parent.find(".oe_default_price:first .oe_currency_value");
        var variant_ids = $ul.data("attribute_value_ids");
        var values = [];
        $parent.find('input.js_variant_change:checked, select.js_variant_change').each(function () {
            values.push(+$(this).val());
        });

        $parent.find("label").removeClass("text-muted css_not_available");

        var product_id = false;
        var product_qty = false;
        for (var k in variant_ids) {
            if (_.isEmpty(_.difference(variant_ids[k][1], values))) {                
                product_id = variant_ids[k][0];
                product_qty = variant_ids[k][4];                
                //$( "#prod_variant_id" ).attr('value', product_id);  
                //$( "#prod_variant_id" ).text(product_id);   
                break;
            }            
        }
        
        var $input_qty = $( "input[name='add_qty']" );
        $input_qty.val(1);
        
        $( "div.stock_label_div" ).addClass("hidden");
        $( "div.stock_label_variant_in" ).addClass("hidden"); 
        $( "div.stock_label_variant_out" ).addClass("hidden"); 
        if (product_id) {
        if(product_qty<=0){
            $( "div.stock_label_variant_out" ).removeClass("hidden");
            $( "div.stock_label_variant_in" ).addClass("hidden"); 
            $( "#qty_avail_variant" ).attr('value', product_qty);
            $( "#qty_avail_variant" ).text(product_qty);   
            $( "#add_to_cart" ).addClass("disabled"); 
            $( ".fa-plus" ).addClass('hidden');
            $( ".fa-minus" ).addClass("hidden");
            $( "input[name='add_qty']" ).prop("readonly",true);
            
            }
        if(product_qty>0){
            $( "div.stock_label_variant_in" ).removeClass("hidden"); 
            $( "div.stock_label_variant_out" ).addClass("hidden"); 
            $( "#qty_avail_variant" ).attr('value', product_qty);  
            $( "#qty_avail_variant" ).text(product_qty);
            $( "#add_to_cart" ).removeClass("disabled");
            $( "i.fa-plus" ).removeClass("hidden");
            $( "i.fa-minus" ).removeClass("hidden");
            $( "input[name='add_qty']" ).prop("readonly",false);
            }
        }    
     if (product_id) {
            var $img = $(this).closest('tr.js_product, .oe_website_sale').find('span[data-oe-model^="product."][data-oe-type="image"] img:first, img.product_detail_img');
            $img.attr("src", "/website/image/product.product/" + product_id + "/image");
            $img.parent().attr('data-oe-model', 'product.product').attr('data-oe-id', product_id)
                .data('oe-model', 'product.product').data('oe-id', product_id);
        }

        $parent.find("input.js_variant_change:radio, select.js_variant_change").each(function () {
            var $input = $(this);
            var id = +$input.val();
            var values = [id];

            $parent.find("ul:not(:has(input.js_variant_change[value='" + id + "'])) input.js_variant_change:checked, select").each(function () {
                values.push(+$(this).val());
            });

            for (var k in variant_ids) {
                if (!_.difference(values, variant_ids[k][1]).length) {
                    return;
                }
            }
            $input.closest("label").addClass("css_not_available");
            $input.find("option[value='" + id + "']").addClass("css_not_available");
        });

        if (product_id) {
            $parent.removeClass("css_not_available");
            $product_id.val(product_id);
            $parent.find(".js_check_product").removeAttr("disabled");
        } else {
            $parent.addClass("css_not_available");
            $product_id.val(0);
            $parent.find(".js_check_product").attr("disabled", "disabled");
        }
    });
    
$('ul.js_add_cart_variants', oe_website_sale).each(function () {
        $('input.js_variant_change, select.js_variant_change', this).first().trigger('change');
    }); 
    
$('.a-submit', oe_website_sale).off('click').on('click', function () {
        var product_added_Dict = $( "#product_added_qty" ).text();   
        var $parent = $(this).closest('.js_product');
        var $product_id = $parent.find('input.product_id').first();
        var product_id = $product_id.val();
        var product_added_list = malformedJSON2Array(product_added_Dict);
        var product_added_qty = product_added_list[product_id];
        var stock = $( "span[name='stock_available']" ).text();
        var $input_qty = $( "input[name='add_qty']" );
        var value = parseInt($input_qty.val(), 10);
        var variant_qty = $( "#qty_avail_variant" ).attr('value');
        
	  if(variant_qty!=undefined)
	      stock = parseInt(variant_qty);
        
       
        
        //alert(product_added_qty);alert(value);alert(stock);alert(parseInt(product_added_qty) + parseInt(value));
        if((parseInt(product_added_qty) + parseInt(value))>parseInt(stock))
        {
           showDialog('Error','As you already added some of the Products, You can\'t add more than '+parseInt(stock-product_added_qty)+'.','error',6);
           return false;
        }
        $(this).closest('form').submit();
    });
$('form.js_attributes input, form.js_attributes select', oe_website_sale).on('change', function () {
        $(this).closest("form").submit();
    }); 
   
});
});

