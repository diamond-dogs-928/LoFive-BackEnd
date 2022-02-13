const mongoose = require('./connection')
const Note = require('../models/note')

Note.deleteMany({})

    .then(() => {

        return Note.insertMany([

            {
                "owner": "Justin6767",
                "post": "I love this track!",
                "likes": 10,
                "comments": [
                    {
                        "owner": "Billie1212",
                        "comment": "Did you know they recorded this in one take?"
                    },
                    {
                        "owner": "Justin6767",
                        "comment": "Yeah, and the guitar was played underwater with no strings!"
                    }
                ],

                "tags": [
                    "Blues",
                    "Smooth"
                ]
            },
            {
                "owner": "Hi-Fi Garri",
                "post": "Anyone out there hear Allen Stone's new album?",
                "likes": 8,
                "comments": [
                    {
                        "owner": "Stephanie1234",
                        "comment": "Yeah...not as good as his last album, but I love track 14."
                    },
                    {
                        "owner": "Hi-Fi Garri",
                        "comment": "Really?  I like this one better.  What's your favorite album of his?"
                    },
                    {
                        "owner": "Nazar1234",
                        "comment": "Yes!  I love Allen Stone.  This album is da bomb!"
                    }
                ],

                "tags": [
                    "Blues",
                    "Smooth",
                    "Soul",
                    "R&B"
                ]
            },
            {
                "owner": "ChristianF123",
                "post": "Anyone know any good new bands with a reggae/funk vibe?",
                "likes": 2,
                "comments": [
                    {
                        "owner": "Stephanie1234",
                        "comment": "My favorites are Tarrus Riley, Queen Ifrica, and Alborosie."
                    },
                    {
                        "owner": "Hi-Fi Garri",
                        "comment": "Raging Fyah."
                    },
                    {
                        "owner": "Nazar1234",
                        "comment": "You can check out Duane Stephenson.  New stuff is ok but his older stuff is awesome if you've never checked him out."
                    }
                ],

                "tags": [
                    "Reggae",
                    "Island",
                    "New"
                ]
            },
            {
                "owner": "Justin6767",
                "post": "Anyone know where I can find the acoustic version of just the guitar track for 'Breaking the Girl'?",
                "likes": 1,
                "comments": [
                    {
                        "owner": "Billie1212",
                        "comment": "try youtube and search for guitar backing track."
                    }
                ],

                "tags": [
                    "RHCP",
                    "Guitar"
                ]
            },
            {
                "owner": "Nazar1234",
                "post": "What's everyone's favorite classic rock track?",
                "likes": 8,
                "comments": [
                    {
                        "owner": "Stephanie1234",
                        "comment": "Led Zeppelin - 'over the hills and far away"
                    },
                    {
                        "owner": "Hi-Fi Garri",
                        "comment": "The Steve Miller Band - 'the Joker'"
                    },
                    {
                        "owner": "Nazar1234",
                        "comment": "Anything by Creedance, but my favorite is 'Born on the Bayou'."
                    }
                ],

                "tags": [
                    "Classic",
                    "Rock",
                    "Oldies",
                    "Favorites"
                ]
            },
        
        ])

    })

    .then((data) => console.log(data))

    .catch(err => console.log(err))

    .finally(() => process.exit())