class Model {

    static get findThisTable(){
        return this.table();
    }

    static  load(id) {
        var setTable =  this.findThisTable;
        let query = 'SELECT * FROM ' + setTable + ' WHERE id = ' + id;
        return global.db.query(query);
    }

    static  loadAll() {
        var setTable =  this.findThisTable;
        let query = 'SELECT * FROM ' + setTable;
        return global.db.query(query);
    }

    save() {
        var setId = typeof this.id;
        //set parameters for UPDATE
        var allfieldValue = [];

        for (var i=0; i < this.fields.length; i++){
            allfieldValue.push(this[this.fields[i]]);
        };

        var allFieldsKey = Object.values(this.fields);
        var allFieldDependence = {};
        allFieldsKey.forEach(function (i, val) {
            allFieldDependence[i] = allfieldValue[val]
        });
        //set parameters for INSERT
        var sliceAllFieldValue = allfieldValue.slice(1);
        var sliceAllFieldsKey = Object.values(this.fields).slice(1);
        var sliceAllFieldDependence = {};
        sliceAllFieldsKey.forEach(function (i, val) {
            sliceAllFieldDependence[i] = sliceAllFieldValue[val]
        });

        //query condition
        if (setId != 'undefined'){
            console.log("UPDATE");
            var idValue = '\'' + this.id + '\'';
            var query = 'UPDATE ' + this.constructor.table() + ' SET ? WHERE id=' + idValue;

            return global.db.query(query, [allFieldDependence, allFieldsKey]);
        }else{
            console.log("INSERT");
            var query = 'INSERT INTO ' + this.constructor.table() + ' SET ? where id = NULL';

            return global.db.query(query, [sliceAllFieldDependence, sliceAllFieldsKey])
        }
    }

    delete() {
        var idValue = '\'' + this.id + '\'';
        let query = 'DELETE FROM ' + this.constructor.table() + ' WHERE id = ' + idValue;
        return global.db.query(query);
    }

}

module.exports = Model;