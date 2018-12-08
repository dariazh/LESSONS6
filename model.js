class Model {
    
    load(id) {
        let query = 'SELECT * FROM ' + this.constructor.table() + ' WHERE id = ' + id;
        global.db.query(query)
            .then((rows) => {
                console.log(rows)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    loadAll() {
        let query = 'SELECT * FROM ' + this.constructor.table();
        global.db.query(query)
            .then((rows) => {
                console.log(rows)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    save() {
        const data = this.fields.filter(field => (field != this.pk)).map(field => field = `${this[field]}`);
        const tableFields = Object.values(this.fields).slice(1);
        var dataStr = [];
        data.forEach(items => dataStr.push('\'' + items + '\''));
        var setFields = {};
        tableFields.forEach(function (i, val) {
            setFields[i] = data[val];
        });
        var setId = typeof this.id;

        if (setId != 'undefined') {
            var id = '\'' + this.id + '\'';
            var query = 'UPDATE ' + this.constructor.table() + ' SET ? WHERE id=' + id;

            global.db.query(query, [setFields, data])
                .then((rows) => {
                    console.log(rows)
                })
                .catch((error) => {
                    console.log(error);
                });

        } else {
            var id = '\'' + this.id + '\'';
            var query = 'INSERT INTO ' + this.constructor.table() + ' (' + tableFields + ') VALUES (' + dataStr + ')';

            global.db.query(query)
                .then((rows) => {
                    console.log(rows)
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    delete(id) {
        let query = 'DELETE FROM ' + this.constructor.table() + ' WHERE id = ' + id;
        global.db.query(query)
            .then((rows) => {
                console.log(rows)
            })
            .catch((error) => {
                console.log(error);
            });
    }

}

module.exports = Model;