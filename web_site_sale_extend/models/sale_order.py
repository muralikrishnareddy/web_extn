# -*- coding: utf-8 -*-
import random

from openerp import SUPERUSER_ID
from openerp.osv import osv, orm, fields
from openerp.addons.web.http import request


class sale_order(osv.Model):
    _inherit = "sale.order"
        
    def _cart_update(self, cr, uid, ids, product_id=None, line_id=None, add_qty=0, set_qty=0, context=None, **kwargs):
        ret = super(sale_order,self)._cart_update(cr, uid, ids, product_id=product_id, line_id=line_id, add_qty=add_qty, set_qty=set_qty, context=context, **kwargs)
        return ret
        
        
class website(orm.Model):
    _inherit = 'website'

    def added_to_cart_product_qty(self, cr, uid, ids, product_id=None, context=None):
        ret = {}
        quantity = 0.00
        sale_order_obj = self.pool['sale.order']
        sale_order_id = request.session.get('sale_order_id')
        if sale_order_id:
            for line in sale_order_obj.browse(cr, uid, sale_order_id, context=context).website_order_line:
                if product_id and product_id == line.product_id.product_tmpl_id.id:
               
                    quantity+=line.product_uom_qty
                    ret[line.product_id.id] = line.product_uom_qty
        return ret
               

