from flask import Flask,request, jsonify;
from flask_pymongo import PyMongo, ObjectId
from flask_cors import CORS

app = Flask(__name__)
app.config['MONGO_URI']='mongodb://localhost/crudapp'
mongo = PyMongo(app)

CORS(app)
db = mongo.db.customers
db2 = mongo.db.products
db3 = mongo.db.services
db4 = mongo.db.transactions
db5 = mongo.db.users
db6 = mongo.db.quotation

@app.route("/customer" , methods = ["POST"])
def create_order():
    result = db.insert_one({
    'name':request.json['name'],
    'mobile':request.json['mobile'],
    'email': request.json['email'],
    'address': request.json['address'],
    })
    order_id = result.inserted_id
    return jsonify({'id': str(ObjectId(order_id)),'msg':'Customer added successfully '})  

@app.route('/customers', methods=['GET'])
def getCustomers():
    customers=[]
    for doc in db.find():
        customers.append({
            '_id':str(ObjectId(doc['_id'])),
            'name':doc['name'],
            'mobile':doc['mobile'],
            'email':doc['email'],
            'address':doc['address'],
        })  
    return jsonify(customers)
    
    
@app.route('/customer/<id>',methods=['GET'])
def getCustomer(id):
    customer = db.find_one({'_id':ObjectId(id)})
    return jsonify({
        '_id':str(ObjectId(customer['_id'])),
        'name':customer['name'],
        'mobile':customer['mobile'],
        'email':customer['email'],
        'address':customer['address'],
    })

@app.route('/customers/<id>',methods=['DELETE'])
def deleteCustomer(id):
    db.delete_one({'_id':ObjectId(id)})
    return jsonify({'msg': "Customer Deleted Sucessfully"})

@app.route('/customer/<id>',methods=['PUT'])
def updateCustomer(id):
    db.update_one({'_id':ObjectId(id)},{'$set':{
        'name':request.json['name'],
        'mobile':request.json['mobile'],
        'email':request.json['email'],
        'address':request.json['address']
    }})
    return jsonify({'msg':"Customer updated sucessfuly"})

@app.route('/product' , methods = ["POST"])
def create_product():
    result = db2.insert_one({
    'name':request.json['name'],
    'description':request.json['description'],
    'qty':request.json['qty'],
    'mrp':request.json['mrp'],
    'sprice':request.json['sprice']
    })
    order_id = result.inserted_id
    return jsonify({'id': str(ObjectId(order_id)),'msg':'Product successfully added'})  

@app.route('/products', methods=['GET'])
def getProducts():
    products=[]
    for doc in db2.find():
        products.append({
            '_id':str(ObjectId(doc['_id'])),
            'name':doc['name'],
            'description':doc['description'],
            'qty':doc['qty'],
            'mrp':doc['mrp'],
            'sprice':doc['sprice'],
        })  
    return jsonify(products)


@app.route("/service" , methods = ["POST"])
def create_service():
    result = db3.insert_one({
    'name':request.json['name'],
    'description':request.json['description'],
    'cost':request.json['cost']
    })
    order_id = result.inserted_id
    return jsonify({'id': str(ObjectId(order_id)),'msg':'Services successfully added'})


@app.route('/services', methods=['GET'])
def getServices():
    services=[]
    for doc in db3.find():
        services.append({
            '_id':str(ObjectId(doc['_id'])),
            'name':doc['name'],
            'description':doc['description'],
            'cost':doc['cost'],
        })  
    return jsonify(services)

@app.route("/transactions" , methods = ["POST"])
def create_transaction():
    result = db4.insert_one({
    'type':request.json['type'],
    'product':request.json['product'],
    'service':request.json['service'],
    'quantity':request.json['quantity'],
    'price':request.json['price'],
    })
    order_id = result.inserted_id
    return jsonify({'id': str(ObjectId(order_id)),'msg':'Transaction successfully added'})

@app.route('/transactions', methods=['GET'])
def getTransactions():
    transactions=[]
    for doc in db4.find():
        transactions.append({
            '_id':str(ObjectId(doc['_id'])),
            'type':doc['type'],
            'product':doc['product'],
            'service':doc['service'],
            'quantity':doc['quantity'],
            'price':doc['price'],
        })  
    return jsonify(transactions)

@app.route('/transactions/<id>',methods=['DELETE'])
def deleteTransaction(id):
    db4.delete_one({'_id':ObjectId(id)})
    return jsonify({'msg': "Transactions Deleted Sucessfully"})

@app.route("/user" , methods = ["POST"])
def create_user():
    result = db5.insert_one({
    'name':request.json['name'],
    'age':request.json['age'],
    'email':request.json['email'],
    'password':request.json['password'],
    })
    order_id = result.inserted_id
    return jsonify({'id': str(ObjectId(order_id)),'msg':'User created'})  

@app.route('/users', methods=['GET'])
def getUsers():
    users=[]
    for doc in db5.find():
        users.append({
            '_id':str(ObjectId(doc['_id'])),
            'email':doc['email'],
            'password':doc['password'],
        })  
    return jsonify(users)

@app.route('/product/<id>',methods=['DELETE'])
def deleteProduct(id):
    db2.delete_one({'_id':ObjectId(id)})
    return jsonify({'msg': "product Deleted Sucessfully"})

@app.route('/service/<id>',methods=['DELETE'])
def deleteService(id):
    db3.delete_one({'_id':ObjectId(id)})
    return jsonify({'msg': "product Deleted Sucessfully"})

@app.route("/quotation" , methods = ["POST"])
def create_quotation():
    result = db6.insert_one({
    'customer_name':request.json['customer_name'],
    'transactionId':request.json['transactionId'],
    'transactionDate':request.json['transactionDate'],
    'items':request.json['items'],
    'total':request.json['total'],
    })
    order_id = result.inserted_id
    return jsonify({'id': str(ObjectId(order_id)),'msg':'quotation created'})  

@app.route("/quotations", methods=["GET"])
def get_quotations():
    quotations = list(db6.find())
    return jsonify(quotations)



if __name__ == '__main__':
    app.run(debug = True)
