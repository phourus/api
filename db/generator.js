var Chance = require('chance');

var Users = require('../models/users');
var Posts = require('../models/posts');
var Orgs = require('../models/orgs');
var Views = require('../models/views');
var Thumbs = require('../models/thumbs');
var Comments = require('../models/comments');
var Locations = require('../models/locations');
var Links = require('../models/links');
var Tags = require('../models/tags');
var Clouts = require('../models/clout');
var Reviews = require('../models/reviews');
var Members = require('../models/members');
var Passwords = require('../models/passwords');

var chance = new Chance();

var POST_TOTAL = 100;
var USER_TOTAL = 50;
var ORG_TOTAL = 20;

/** TYPES **/
var User = function User () {
  return {
        username: chance.word(), 
        first: chance.first(),
        last: chance.last(),
        email: chance.email(), 
        phone: chance.phone(),
        gender: chance.character({pool: "MFP"}),
        occupation: chance.word(),
        company: chance.word(),
        website: chance.domain(),
        dob: chance.birthday(),
        influence: chance.integer({min: 0, max: 100}),
        img: chance.integer({min: 1, max: 10})
    }  
}

var Post = function Post () {
  return {
    user_id: chance.integer({min: 1, max: USER_TOTAL}),
    privacy: ['public', 'phourus', 'private'][chance.integer({min: 0, max: 2})],
    type: ['blog', 'event', 'subject', 'question', 'debate', 'poll', 'quote', 'belief'][chance.integer({min: 0, max: 7})],
    title: chance.sentence(),
    content: chance.paragraph(),
    element: ['world', 'mind', 'voice', 'self'][chance.integer({max: 4})],
    category: chance.word(),
    lat: chance.latitude(),
    lng: chance.longitude(),
    comments: chance.integer({min: 0, max: 1000}),
    views: chance.integer({min: 0, max: 100000}),
    thumbs: chance.integer({min: 0, max: 10000}),
    popularity: chance.integer({min: 0, max: 100}),
    influence: chance.integer({min: 0, max: 100}),
    positive: chance.bool(),
    zip: chance.zip(),
    author: chance.name(),
    vote: chance.bool()
    }  
}

var View = function View () {
    return {
        ip: chance.ip(),
        path: '/',
        user_id: chance.integer({min: 1, max: USER_TOTAL}),
        org_id: 1,
        post_id: 1,
        location: '',
        viewer_id: chance.integer({min: 1, max: USER_TOTAL}),
        referer: chance.url(),
        exit: chance.url()
    }
}

var Thumb = function Thumb () {
    return {
        post_id: chance.integer({min: 1, max: POST_TOTAL}),
        user_id: chance.integer({min: 1, max: USER_TOTAL}),
        positive: chance.bool()       
    }
}

var Comment = function Comment () {
    return {
        user_id: chance.integer({min: 1, max: USER_TOTAL}),
        post_id: chance.integer({min: 1, max: 10}),
        content: chance.paragraph()        
    }
}

var Location = function Location () {
    return {
        org_id: chance.integer({min: 1, max: ORG_TOTAL}),
        user_id: chance.integer({min: 1, max: USER_TOTAL}),
        street: chance.street(),
        city: chance.city(),
        county: chance.province(),
        state: chance.state(),
        country: chance.country(),
        zip: chance.zip(),
        lat: chance.latitude(),
        lng: chance.longitude(),
        type: ['primary', 'business', 'residential', 'mailing'][chance.integer({min: 0, max: 3})]
    }
}

var Link = function Link () {
    return {
        post_id: chance.integer({min: 1, max: POST_TOTAL}),
        url: chance.url(),
        caption: chance.sentence()      
    }
}

var Tag = function Tag () {
    return {
        post_id: chance.integer({min: 1, max: POST_TOTAL}),
        tag: chance.word()
    }

}

var Org = function Org () {
    return {
        type: ['company', 'school', 'government', 'group'][chance.integer({min: 0, max: 3})],
        name: chance.sentence(),
        shortname: chance.word(),
        email: chance.email(),
        phone: chance.phone(),
        fax: chance.phone(),
        website: chance.domain(),
        influence: chance.integer({min: 0, max: 100}),
        img: '',
        people: chance.integer({min: 1, max: 10000}),    
        about: chance.paragraph(),
        video: chance.url(),
        channel: chance.url(),
        contact: chance.paragraph()
    }
}

var Clout = function Clout () {
    return {
        org_id: chance.integer({min: 1, max: ORG_TOTAL}),
        type: ['press', 'award'][chance.integer({min: 0, max: 1})],
        title: chance.sentence(),
        date: chance.date(),
        content: chance.paragraph(),
        img: ''
    }
}

var Review = function Review () {
    return {
        org_id: chance.integer({min: 1, max: ORG_TOTAL}),
        user_id: chance.integer({min: 1, max: USER_TOTAL}),
        title: chance.sentence(),
        content: chance.paragraph(),
        rating: chance.integer({min: 1, max: 5})
    }
}

var Member = function Member () {
    return {
        org_id: chance.integer({min: 1, max: ORG_TOTAL}),
        user_id: chance.integer({min: 1, max: USER_TOTAL}),
        type: ['member', 'admin'][chance.integer({min: 0, max: 1})],
        approved: chance.bool()
    }
}

var Password = function Password () {
    return {
        user_id: chance.integer({min: 1, max: USER_TOTAL}), 
        hash: Passwords.hash('phourus')     
    }    
}

/** GENERATE **/
function generate (Model, count, db) {
    var i = 0;
    while (i < count) {
        var model = new Model();
        db.add(model).catch(function(err) {
            console.log(err);
        });
        i++;
    }   
}

/** EXECUTE **/
generate(User, USER_TOTAL, Users);
generate(Post, POST_TOTAL, Posts);
generate(Org, ORG_TOTAL, Orgs);
generate(View, 500, Views);
generate(Thumb, 200, Thumbs);
generate(Comment, 100, Comments);
generate(Location, 100, Locations);
generate(Link, 200, Links);
generate(Tag, 400, Tags);
generate(Member, 200, Members);
generate(Clout, 200, Clouts);
generate(Review, 200, Reviews);
// Password is part of User Registration transaction, must isolate/redesign API
//generate(Password, 200, Passwords);