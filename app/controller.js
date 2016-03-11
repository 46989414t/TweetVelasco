
app.controller("Tweet", ["$scope", "chatMessages", "getUser", "getUserTweets", "chatMessagesUser", "userList", "getFollowings",
    function($scope, chatMessages,getUser, getUserTweets,chatMessagesUser, userList, getFollowings) {
        //$scope.user = "Enric";
        //veure els missatges de tothom
        $scope.messages = chatMessages;
        $scope.usersToFollow  = userList;
        console.log("mensajes",chatMessages)
        console.log("users to follow", userList);
        console.log("users to follow2", $scope.usersToFollow.name);
        //$scope.messages2 = chatMessagesUser;

        $scope.setUser = function() {
            $scope.userId = $scope.usuari;
            console.log("USER ID", $scope.userId);
            var dades = getUser($scope.userId);
            $scope.userName = dades.nom;
            $scope.userDesc = dades.desc;
            $scope.userTweets = getUserTweets($scope.userId);
            $scope.followings = getFollowings($scope.userId);
            console.log("SEGUITS: ", $scope.followings);

            $scope.seguidoId = $scope.dadesSeguits;
            //var dadesSeguits = getUser

            $scope.tweetSeguidos = getUserTweets($scope.followings);
            //$scope.followingTweets = getFollowingTweets($scope.userId);
            //$scope.messages2 = chatMessagesUser($scope.userId);

            //console.log("tweets: "+$scope.userTweets);



        };


        $scope.setTweet = function(){
            $scope.userTweets.$add({text: $scope.tweetTxt});
            $scope.tweetTxt = "";

        };

        $scope.follow = function() {
            $scope.followings.$add({userId: $scope.usuari2Follow});//devuelve el id pero no los muestra
            //console.log("TWEETS SEGUIDOS", $scope.userTweetsSeg);
            $scope.usuari2Follow = "";

        }

    }
]);
app.factory("chatMessagesUser", ["$firebaseArray",
    function($firebaseArray) {
        return function(usuari) {
            var ref = new Firebase("https://ecaibtweet.firebaseio.com/users");

            return {nom: $firebaseArray(ref.child(usuari).child("tweet"))};
        };
    }
]);

app.factory("chatMessages", ["$firebaseArray",
    function($firebaseArray) {
        // create a reference to the database location where we will store our data
        var ref = new Firebase("https://ecaibtweet.firebaseio.com/tweets");

        // this uses AngularFire to create the synchronized array
        return $firebaseArray(ref);
    }
]);

app.factory("userList", ["$firebaseArray",
    function($firebaseArray) {
        console.log("ENTRA EN USER LIST")
        // create a reference to the database location where we will store our data
        var ref = new Firebase("https://ecaibtweet.firebaseio.com/users");

        // this uses AngularFire to create the synchronized array
        return $firebaseArray(ref);
    }
]);

app.factory("getUser", ["$firebaseObject",
    function($firebaseObject) {
        return function(usuari) {
            var ref = new Firebase("https://ecaibtweet.firebaseio.com/users");

            return {nom: $firebaseObject(ref.child(usuari).child("name")),
                desc: $firebaseObject(ref.child(usuari).child("description"))};
        };
    }
]);
app.factory("getUserTweets", ["$firebaseArray",
    function($firebaseArray) {
        return function(usuari) {
            // create a reference to the database location where we will store our data
            var ref = new Firebase("https://ecaibtweet.firebaseio.com/users");
            return $firebaseArray(ref.child(usuari).child("tweets"));
        };
    }
]);

app.factory("getFollowings", ["$firebaseArray",
    function($firebaseArray) {
        return function(usuari) {
            var ref = new Firebase("https://ecaibtweet.firebaseio.com/users");
            return $firebaseArray(ref.child(usuari).child("following"));
        };
    }
]);

