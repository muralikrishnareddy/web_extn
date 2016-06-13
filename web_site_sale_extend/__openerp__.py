{
    'name': 'eCommerce Extension to Display Stock Info',
    'category': 'Website',
    'summary': 'Sell Your Products Online with Product Stock Info',
    'website': 'http://www.credativ.in',
    'version': '1.0',
    'description': """
OpenERP E-Commerce
==================
 Add features like, showing Stock Information on Products and validates not to allow more Quantity while Adding to Cart.
        """,
    'author': 'Murali Krishna Reddy',
    'depends': ['website_sale'],
    'sequence':0,
    'images':['images/websale1.png'],
    'data': [
        'views/templates.xml',
    ],
    'demo': [
    ],
    #'qweb': ['static/src/xml/*.xml'],
    'installable': True,
    'application': True,
}
