Some tips about mongodb

````
CRUD Operations:

Inserting:

insertOne(): It inserts one document and creates a collection if it doesn’t exist
insertMany([{},{}]): You pass it an array of objects, and it creates all of them as documents in the collection, it returns an insertedIds array containing all insert _ids. 
You can pass it as a second argument the ordered: false parameter that says the if there are error don’t stop just keep going.
You can pass “_id” to set an specific id of the document.
Reading:

find(): returns all documents if you don’t pass it a query selector
find({rating: “pg-13”}): returns all documents that have a rating of “pg-13"
find({“tomato.meter”: 100}): returns all documents that have 100 in the value meter of the object nested tomato
You can use . notation to access documents inside documents always inside “"
Equality matches on arrays:
On the entire array: find({"actors”: [“juan”, “carolina"]}) , putting [] makes the jury try to find and exact match of the array.
Based on any element: find({“actors”: “juan”}), this will find all documents where “juan” is an element inside the “actors” array.
Based on an specific element: find({“actors.0”: “juan"}), this will find all documents where the first element of the “actors” arrays is “juan”
Projections:
They are the second arguments in the find() method, they specified which fields to return in the documents
find({“actors”: “juan”}, {title: 1, _id: 0}): this will return only the title field and will exclude the _id field
find({“actors”: “juan”, {tittle: 0, age: 0}}: this will return all fields except title and age
Cursors:
All find queries return a cursor, a cursor is limited by a batch size in order to iterate over the cursor you can use the it command.
If the cursor is assigned to a variable C you can do the following. c.hasNext() to see if there are more documents in the cursor and c.next() to show next batch and finally c.objsLeftInBatch() tells me how many objects remain in the cursor.
Comparison Operators:
Comparison operator lets us find things based on a criteria, like greater than , less than or not equal to. the way to use then is putting them inside an object inside de selection criteria
find({“tomato.meter”: {$gt: 95}, actors: “juan”}) : this will find all movies with a meter greater then 95 and where one of the actors was “juan” - list of Comparison Operators: - $gt
$gte - $lt
$lte - $ne
$in: the value is always an array - $nin: the value is always an array
Element Operators:
Element operators let os see if a document has a field and if the field os of certain type
$exists: find({“tomato.meter”:{$exists: true}}) this will find al documents in the movies collections where the “tomato.meter” field does exist - $type: find( { _id: { $type: “string” } }) this will find all documents where the _id fields has a value of the type “string” - Logical Operators: - Logical operator are to to queries with or and or nor. They always need an Array as value - $and : find({ $and: [“tomato.meter”:{$exists: true},“tomato.meter”:{$ne: null}] }), the $and is explicit in most queries except when we need to specified criteria on the same key, like in here with tomato.meter
$or : find({ $or: [“tomato.meter”:{$gt: 95},“meteoritic.meter”:{$gt: 88}] }) - Array Operators: - Array operators work on fields where the value is an array - $all : find({ countries: { $all: [“co”, “us”, “au”] } }) this will find all documents where the field countries has inside its array the values the values [“co”, “us”, “au”] - $elemtMatch find({ boxOffice: { $elementMatch: {country: “UK”, revenue: {$gt: 15} } } }) this finds all documents where the box-office is an array of object in where one of the objects has the value “UK” and revue gt than 15 - $size find({ countries: { $size: 1 } }) this finds all documents where the the countries field is an array with only 1 element.
Updates:

updateOne( {selection_critiria}, {update_operation} ), the selection criteria finds all documetns that match but updateOne only updates the first one that it finds. The update operations is specified inside the second parameter, this operation can use the operators the exist to update documents.
updateOne({ title: “the martian” }, { set$ { poster: “some poster” } }) - updateMany - upserts - replaceOne - Update Operators: - $inc Increments the value of the field by the specified amount.
$mul Multiplies the value of the field by the specified amount. - $rename Renames a field.
$setOnInsert Sets the value of a field if an update results in an insert of a document. Has no effect on update operations that modify existing documents. - $set Sets the value of a field in a document.
$unset Removes the specified field from a document. - $min Only updates the field if the specified value is less than the existing field value.
$max Only updates the field if the specified value is greater than the existing field value. - $currentDate Sets the value of a field to current date, either as a Date or a Timestamp.
Array Operators
$: Acts as a placeholder to update the first element that matches the query condition in an update. - $addToSet: Adds elements to an array only if they do not already exist in the set.
$pop: Removes the first or last item of an array. - $pullAll: Removes all matching values from an array.
$pull: Removes all array elements that match a specified query. - $pushAll: Deprecated. Adds several items to an array.
$push: Adds an item to an array. - Modifiers - $each: Modifies the $push and $addToSet operators to append multiple items for array updates. - $slice : Modifies the $push operator to limit the size of updated arrays. - $sort : Modifies the $push operator to reorder documents stored in an array. - $position : Modifies the $push operator to specify the position in the array to add elements.



mongoimport: Allows to restores a dump composed of human readable JSON

mongorestore: Restores a dump of a binary file

Cursors:

A Cursors is just a description of the query to be perform, it doesn't actually perform a query, in order to return a query we have to tell how to consume it, ways to consume a cursor:

toArray(): Convert all returning arguments to an array Less performance because it returns all documents at once
forEach(): Different than the forEach method of javascript, it expects two arguments, the first one being the callback to be call for each document in the iteration, and the second one being the callback on what to do if there’s an error or when the loop is done. It is a lot more performant than toArray thanks to batch loading

cursor.forEach( function(doc){ console.log(doc.name +" is a " + doc.category_code + ' company.') }, function(err){ assert.equal(null, err) db.close() } )

.project(): this is the best way to use projections with a cursor, you just pass the projection object to it.

$regex:

You can specify if you want to add regex to a query query with case sensitive or insensitive by passing options

{$regex: /[abc]/, options: “i”} , "i" for insensitive

Dot Notation:

In the node.js mongodb driver you can use dot notation both to access embedded documents, or documents that are inside arrays in a document.

Example:

Array with documents :

offices : [ {code: “col”}, {code: “usa”} ]

We can use office.code to access each array element

Embedded document:

offices : { name: “bogota”, code: “col" }

Normal dot notation way to access embedded document: offices.name => "bogota"

SKIPT, LIMIT, SORT:

In order to use this operators we need to chain them to a cursor. they do not force a query to the database. MongoDb will always apply first the sort then skip and last limit.

Sort
ASC and DESC
cursor.sort({founded_year: 1}) // ascending order 1
cursor.sort({founded_year: -1}) // descending order -1
Index
If sorting by a field that does not have an index, mongo will delegate the sorting to memory and if the database is to big this is going to explote, so you need to add an index to the field in order to let mongo do the sorting in the database with the following command db.companies.createIndex({permalink: 1})
Sorting by multiple fields
In this case we need to pass an array to sort() instead of an object because and array guarantees the order in which we are going to sort by, with and object we don’t have that guarantee
cursor.sort([ [‘founded_year’, 1], [‘employees’, -1] ]) we are sorting here by found year first in ascending order and then by number of employees in descending order
Skip
cursor.skip(10) // this will skip the first 10 documents
Limit
cursor.limit(10) // this will limit de query result to only 10 documents
Searching for Duplicates:

Search for a field name that exists and it’s not null and project that field and the ‘updated_at’ field then sort by that field name then compare the previous record to the current_one if they have the same values delete the current_one and then update the previous doc to the current_one


Living without constrains
In mongoDB there are no foreign_key constrains, so there’s no way that we can guaranteed that we associated a document to another one that really exists so the best way to get around this problem is by: Embedding documents. When we embed documents we guaranteed that we are adding thing to a document that already exists.
Living without Transactions
In mongoDb there’s no transactions, so there’s no way that we can perform operations on several documents own one single command. So there’s no way that we can comply with the ACID principles. The way to get around this is by:
Restructuring: this means that we are doing we are embedding documents that meas that all the information that we need regarding a resource lives inside in one single document so with only one atomic operation we can modify all that we need without relying on transactions.
Tolerate
Implement software checks: check systematically for inconsistencies in the DB
Relations:

One To One: Options [embed or link] :

Considerations to have on wether to embed or link:
frequency of acces: If you access all of times one part of the relation but not the other one and the other one is really big maybe it’s better not to embed
growing patter: if i have to constantly update one part but no the other maybe its better to not embed
Document size: maybe embedding can lead to documents larger than 16mb
Atomic operations: if i want to have atomic operations i need to embed.
One to Many:

The question here really is if it really is One to Many or One to Few, is the relations it’s really one to many there’s no other way to do it other than by Linking, if its is one to few we could embed the documents.

Many to Many:

Embed at your own peril, but the best way is probably by using Linking in which we have an array of the foreign_keys, best way to only have it in only one direction but is also good to have it in both directions depending on data access patterns.

Multikey indexes:

When you are linking, specially own Many to Many relationships theres always to obvious queries that you would like to perform. For example if you have the Students collections and the Teachers collections. you can put an array inside the student document with the ID of the Teachers that that student has had. Example:

Student: { _id: 1, name: "juan", teachers: [1,2,3,4] }

Teacher: { _id: 1, name: "Tony Stark" }

With this example if you would like to do a query for getting all the teachers of a student you could do:

const teachers = db.students.findOne({name: "juan"}, {teachers: 1})
db.teachers.find({_id: {$in: teachers}})
If you would like to get all the students that have had a particularly teacher your benefit of using Multikey Indexes:

First add the mutikey index to the array of teachers in the student document with this command:
db.students.ensureIndex( {teachers: 1} )
Then query the students field using the $all operators - db.students.find({ teachers: { $all: [1 , 2] } }) // this is going to fins all students with teachers 1 and 2
.explain() at the end of the query shows how mongo did the operation

Modeling Trees:

Trees are parent children relationships like the one that you would find in a categories collection where a category has children categories a parent category and ancestor categories.

The best way to model this is with a document like this one. In this way I know how is my immediate parent, and also all my others ancestors, so if i want to get all the children of one category i could do:

db.categories.find({ancestors: 34), this way Im searching for all categories that have my id as one of their ancestor.

{ _id: 34, name : "Snorkeling", parent_id: 12, ancestors: [12, 35, 90] }

Denormalization Summary:

1:1 -> Embed 1: Many -> Embed putting the many inside the One Many: Many -> Link and use multi key Indexes

````