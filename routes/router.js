class Param {
    constructor(label, key=false, hidden=false, required=false) {
        this.label    = label;

        this.key      = key;
        this.hidden   = hidden;
        this.required = required;
    }
}
module.exports.Param = Param;

class Route {
    constructor(params) {
        this.params = params;

        this.keys      = []
        this.hiddens   = []
        this.requireds = []

        this.catalog();
    }

    catalog() {
        for (let param of this.params)
        {
            if (param.key)
                this.keys.push(param);
            if (param.hidden)
                this.hiddens.push(param);
            if (param.required)
                this.requireds.push(param);
        }
    }

    queryHasAllKeys(query) {
        for (let param of this.keys) {
            if (param.key && !query[param.label])
                return false;
        }
        return true;
    }

    queryHasAllRequireds(query) {
        for (let param of this.requireds) {
            if (param.required && !query[param.label])
                return false;
        }
        return true;
    }

    cleanHiddenKeys(data) {
        let cleaned = Object.assign({}, data);
        for (let key of this.hiddens) {
            delete cleaned[key.label];
        }
        return cleaned;
    }

    cleanNonParams(data) {
        const obj = {};

        for (let param of this.params)
            obj[param.label] = data[param.label]

        return obj;
    }

    route(route, app, db) {
        app.get (route, (req, res) => this._get(db, req, res));
        app.post(route, (req, res) => this._post(db, req, res));
        app.put (route, (req, res) => this._put(db, req, res));
        app.delete(route, (req, res) => this._delete(db, req, res));
    }

    // routes
    // TODO use a better system for this
    _get(db, req, res) {
        if (!this.queryHasAllKeys(req.query))
        {
            res.status(400);
            return res.send("Missing key param");
        }

        const found = [];
        for (let user of db) {
            for (let key of this.keys) {
                if (user[key.label] != req.query[key.label])
                    break;
            }
            found.push(this.cleanHiddenKeys(user));
        }

        res.send(JSON.stringify(found));
    }

    _post(db, req, res) {
        if (!this.queryHasAllRequireds(req.query))
        {
            res.status(400);
            return res.send("Missing required param");
        }

        for (let user of db) {
            for (let key of this.keys) {
                if (user[key.label] != req.query[key.label])
                    break;
            }

            res.status(400);
            return res.send("Item already exists");
        }

        db.push(this.cleanNonParams(req.query));
        res.send('Created.');
    }

    _put(db, req, res) {
        if (!this.queryHasAllKeys(req.query))
        {
            res.status(400);
            return res.send("Missing key param");
        }
        if (!this.queryHasAllRequireds(req.query))
        {
            res.status(400);
            return res.send("Missing required param");
        }

        const found = [];
        for (let i = 0; i < db.length; i++) {
            for (let key of this.keys) {
                if (db[i][key.label] != req.query[key.label])
                    break;
            }
            db[i] = this.cleanNonParams(req.query);
            return res.send('Updated.');
        }
    }

    _delete(db, req, res) {
        if (!this.queryHasAllKeys(req.query))
        {
            res.status(400);
            return res.send("Missing key param");
        }

        const found = [];
        for (let i = 0; i < db.length; i++) {
            for (let key of this.keys) {
                if (db[i][key.label] != req.query[key.label])
                    break;
            }
            db = db.splice(i, 1);
            return res.send('Deleted.');
        }
    }
}
module.exports.Route = Route;