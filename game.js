document.addEventListener("DOMContentLoaded", function () {
    // Open modals
    const howToPlayModal = document.getElementById("howToPlayModal");
    const characterSelectModal = document.getElementById("characterSelectModal");
    const startModal = document.getElementById("startModal");

    const howToPlayBtn = document.getElementById("howToPlayBtn");
    const closeHowToPlay = document.getElementById("closeHowToPlay");

    const characterSelectBtn = document.getElementById("characterSelectBtn");
    const closeCharacterSelect = document.getElementById("closeCharacterSelect");

    const startBtn = document.getElementById("startBtn");
    const closeStartModal = document.getElementById("closeStartModal");

    const agentX = document.getElementById("agentX");
    const agentY = document.getElementById("agentY");

    const characterImageInNav = document.getElementById("characterImageInNav");
    const characterNameInNav = document.getElementById("characterNameInNav");

    const continueBtn = document.getElementById("continueBtn");
    const exitBtn = document.getElementById("exitBtn");

    let selectedCharacter = localStorage.getItem("selectedCharacter") || "Agent Rex";

    const storedCharacterName = localStorage.getItem("selectedCharacter");
    const storedCharacterImage = localStorage.getItem("characterImage");

    console.log("Stored Name:", storedCharacterName);
    console.log("Stored Image:", storedCharacterImage);

    if (storedCharacterName && storedCharacterImage) {
        updateCharacterInNav(storedCharacterName, storedCharacterImage);
    } else {
        console.log("No character selected, setting default...");
        updateCharacterInNav("Agent Rex", "/assets/Aryan.jpeg");
    }

    howToPlayBtn.onclick = () => (howToPlayModal.style.display = "block");
    closeHowToPlay.onclick = () => (howToPlayModal.style.display = "none");

    characterSelectBtn.onclick = () => (characterSelectModal.style.display = "block");
    closeCharacterSelect.onclick = () => (characterSelectModal.style.display = "none");

    startBtn.onclick = () => (startModal.style.display = "block");
    closeStartModal.onclick = () => (startModal.style.display = "none");

    agentX.onclick = () => {
        localStorage.setItem("selectedCharacter", "Agent Rex");
        localStorage.setItem("characterImage", "/assets/Aryan.jpeg");
        updateCharacterInNav("Agent Rex", "/assets/Aryan.jpeg");
        characterSelectModal.style.display = "none";
    };

    agentY.onclick = () => {
        localStorage.setItem("selectedCharacter", "Agent Kate");
        localStorage.setItem("characterImage", "/assets/Kate.jpeg");
        updateCharacterInNav("Agent Kate", "/assets/Kate.jpeg");
        characterSelectModal.style.display = "none";
    };

    function updateCharacterInNav(characterName, characterImage) {
        if (characterNameInNav && characterImageInNav) {
            console.log("Updating navbar with", characterName, characterImage);
            characterNameInNav.textContent = characterName;
            characterImageInNav.src = characterImage;
        } else {
            console.error("Navbar elements not found");
        }
    }

    continueBtn.onclick = () => {
        window.location.href = "game.html"; 
    };

    
});



document.addEventListener("DOMContentLoaded", function () {
    
    const bgImage = document.getElementById("bg-image");
    const modal = document.getElementById("stateModal");
    const modalText = document.getElementById("modalText");
    const optionsContainer = document.getElementById("optionsContainer");
    const timerDisplay = document.getElementById("timer");
    const intelScoreDisplay = document.getElementById("intelScore");
    const feedbackModal = document.getElementById("feedbackModal");
    const feedbackText = document.getElementById("feedbackText");
    const timeoutModal = document.getElementById("timeoutModal");

    
    let intelScore = parseInt(localStorage.getItem("intelScore")) || 0;
    intelScoreDisplay.textContent = `Intel Score: ${intelScore}`;

    let timerInterval;
    let optionSelected = false;

    
    const states = {
        "start": {
            img: "assets/intro.jpg",
            text: "You’ve successfully arrived at the mafia's headquarters. Now, it’s time to choose how you’ll enter without alerting their security. Each option comes with its own risks and rewards, but remember, the goal is to remain unseen",
            options: [
                { 
                    text: "Stealth Entry", 
                    nextState: "one",
                    value: "best",
                    feedback: "You chose wisely, you’re unseen by the guards!"
                },
                { 
                    text: "Bribe a guard", 
                    nextState: "two",
                    value: "useless",
                    feedback: "Bad choice, the guard could betray you."
                },
                { 
                    text: "Cause a distraction", 
                    nextState: "three",
                    value: "risky",
                    feedback: "It worked, but now the mafia is on alert!."
                },
                { 
                    text: "Go in gun blazing", 
                    nextState: "four",
                    value: "bad",
                    feedback: "Disastrous! The mafia is now hunting you!"
                }
            ]
        },

        "one": {
            img: "assets/room.jpg",
            text: "Now that you're inside, the real work begins.Your mission is to access critical data from the mafia's secure network.",
            options: [
                { 
                    text: "Hack the office computer", 
                    nextState: "five",
                    value: "best",
                    feedback: "You are skilled, that was nice!"
                },
                { 
                    text: "Crack safe in boss room", 
                    nextState: "five",
                    value: "risky",
                    feedback: "It worked, but now the mafia is on alert!."
                },
                { 
                    text: "Check the storage room for hidden data", 
                    nextState: "five",
                    value: "useless",
                    feedback: "You only got grocery list <__>."
                }
            ]
        },

        "two": {
            img: "assets/room.jpg",
            text: "Now that you're inside, the real work begins.Your mission is to access critical data from the mafia's secure network.",
            options: [
                { 
                    text: "Take gaurds Access Key", 
                    nextState: "six",
                    value: "best",
                    feedback: "You are skilled, that was nice!"
                },
                { 
                    text: "Eavesdrop on gaurds converstion", 
                    nextState: "six",
                    value: "useless",
                    feedback: "Not a good choice,you could have done better."
                },
                { 
                    text: "Knock off the gaurd and get back your money", 
                    nextState: "six",
                    value: "risky",
                    feedback: "It worked, but now the others are on alert!"
                }
            ]
        },

        "three": {
            img: "assets/room.jpg",
            text: "Now that you're inside, the real work begins.Your mission is to access critical data from the mafia's secure network.",
            options: [
                { 
                    text: "Search unattended laptos for data", 
                    nextState: "seven",
                    value: "useless",
                    feedback: "Not a good choice,you could have done better."
                },
                { 
                    text: "Plant a listening bug in meeting room", 
                    nextState: "seven",
                    value: "best",
                    feedback: "You are skilled, that was nice!"
                },
                { 
                    text: "Plant a device to scramble communication", 
                    nextState: "seven",
                    value: "neutral",
                    feedback: "It worked, but now the others are on alert!"
                }
            ]
        },

        "four": {
            img: "assets/room.jpg",
            text: "Now that you're inside, the real work begins.Your mission is to access critical data from the mafia's secure network.",
            options: [
                { 
                    text: "Interrogate a captured mafia member", 
                    nextState: "eight",
                    value: "useless",
                    feedback: "Waste of time,he did not reveal."
                },
                { 
                    text: "Shoot Security Camera to avoid tracking", 
                    nextState: "eight",
                    value: "bad",
                    feedback: "Data is already stored locally!"
                },
                { 
                    text: "Force your way into office and grab files", 
                    nextState: "eight",
                    value: "risky",
                    feedback: "It worked, but it was risky!"
                }
            ]
        },

        "five": {
            img: "assets/escape.jpg",
            text: " Now comes the most dangerous part: escaping the mafia's fortress without getting caught. You’ve got to make a clean getaway. The mafia will be looking for you, and time is running out",
            options: [
                { 
                    text: "Slip out through staff exit", 
                    nextState: function(score) {
                        if (score >= 15) return "nine";
                        return "ten";
                        
                    },
                    value: "best",
                    feedback: "Worth a shot!."
                },
                { 
                    text: "Hide in the duct and wait until the morning", 
                    nextState: "eleven",
                    value: "bad",
                    feedback: "Bad choice,you will get trapped!"
                },
                { 
                    text: "Disguise yourself as mafia member and walkout", 
                    nextState: function(score) {
                        if (score >= 10) return "nine";
                        return "ten";
                        
                    },
                    value: "risky",
                    feedback: "It worked, but it was risky!"
                }
            ]
        },
        "six": {
            img: "assets/escape.jpg",
            text: " Now comes the most dangerous part: escaping the mafia's fortress without getting caught. You’ve got to make a clean getaway. The mafia will be looking for you, and time is running out",
            options: [
                { 
                    text: "Steal Mafia members car and drive", 
                    nextState: function(score) {
                        if (score >= 15) return "nine";
                        return "ten";
                        
                    },
                    value: "good",
                    feedback: "Worth a shot!."
                },
                { 
                    text: "Try to walk out casually through main door", 
                    nextState: function(score) {
                        if (score >= 15) return "nine";
                        return "ten";
                        
                    },
                    value: "neutral",
                    feedback: "It worked, but it was risky!"
                },
                { 
                    text: "Jump from building", 
                    nextState: "eleven",
                    value: "bad",
                    feedback: "Bad choice,you will be injured!"
                }
            ]
        },
        "seven": {
            img: "assets/escape.jpg",
            text: " Now comes the most dangerous part: escaping the mafia's fortress without getting caught. You’ve got to make a clean getaway. The mafia will be looking for you, and time is running out",
            options: [
                { 
                    text: "Slip out during chaos", 
                    nextState: function(score) {
                        if (score >= 15) return "nine";
                        return "ten";
                       
                    },
                    value: "good",
                    feedback: "Worth a shot!."
                },
                { 
                    text: "Set building on fire", 
                    nextState: "eleven",
                    value: "bad",
                    feedback: "Not a good choice,you will be injured!"
                },
                { 
                    text: "Use a smoke bomb", 
                    nextState: intelScore >= 10 ? "nine" : "ten",
                    value: "best",
                    feedback: "That was nice, you came prepared!"
                }
            ]
        },
        "eight": {
            img: "assets/escape.jpg",
            text: " Now comes the most dangerous part: escaping the mafia's fortress without getting caught. You’ve got to make a clean getaway. The mafia will be looking for you, and time is running out",
            options: [
                { 
                    text: "Steal a motercycle and escape", 
                    nextState: function(score) {
                        if (score >= 15) return "nine";
                        return "ten";
                        
                    },
                    value: "good",
                    feedback: "Worth a shot!."
                },
                { 
                    text: "Take cover and wait for police", 
                    nextState: "eleven",
                    value: "bad",
                    feedback: "Bad choice,police never come on time!"
                },
                { 
                    text: "Take a hostage to force an escape", 
                    nextState: intelScore >= 10 ? "nine" : "ten",
                    value: "risky",
                    feedback: "It worked, but it was risky!"
                }
            ]
        },

        "nine": {
            img: "assets/end1.jpg",
            text: " Success you won! ",
            options: [
             
            ]
        },
        "ten": {
            img: "assets/end2.jpg",
            text: " You barely Escaped ",
            options: [
             
            ]
        },
        "eleven": {
            img: "assets/end3.jpg",
            text: " You got killed ",
            options: [
             
            ]
        },
    };

    function startTimer() {
        let timeLeft = 15;
        timerDisplay.textContent = timeLeft;
        
        timerInterval = setInterval(() => {
            timeLeft--;
            timerDisplay.textContent = timeLeft;
            
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                handleTimeout();
            }
        }, 1000);
    }

    const exitBtn = document.getElementById("exitBtn");
    exitBtn.addEventListener("click", function() {
       
        localStorage.setItem("intelScore", "0");
       
        window.location.href = "index.html";
    });

    
    function handleTimeout() {
        if (!optionSelected) {
            localStorage.setItem("intelScore", "0");
            timeoutModal.style.display = "block";
            setTimeout(() => {
                window.location.href = "index.html";
            }, 2000);
        }
    }

    function showFeedback(feedback, isGoodChoice) {
        feedbackText.textContent = feedback;
        feedbackModal.className = `feedback-modal ${isGoodChoice ? 'good' : 'bad'}`;
        feedbackModal.style.display = "block";
        
        setTimeout(() => {
            feedbackModal.style.display = "none";
            updateState(nextStateToGo);
        }, 2000);
    }

 


    function createOptionButton(option) {
        const button = document.createElement("button");
        button.textContent = option.text;
        button.classList.add("option-button");
        
        button.addEventListener("click", () => {
            if (!optionSelected) {
                optionSelected = true;
                clearInterval(timerInterval);
                
                if (option.value === "best") {
                    intelScore += 5;
                } else if (option.value === "good" || option.value === "neutral" || option.value === "risky") {
                    intelScore += 2;
                }
                
                localStorage.setItem("intelScore", intelScore);
                intelScoreDisplay.textContent = `Intel Score: ${intelScore}`;
                
                // Handle the nextState determination
                nextStateToGo = typeof option.nextState === 'function' 
                    ? option.nextState(intelScore) 
                    : option.nextState;
                
                showFeedback(option.feedback, option.value !== "bad" && option.value !== "useless");
            }
        });
        
        return button;
    }

    let nextStateToGo = "";

    function updateState(newState) {
        if (states[newState]) {
            currentState = newState;
            optionSelected = false;
            
           
            bgImage.src = states[newState].img;
            
            
            modalText.textContent = states[newState].text;
            modalText.style.display = "block";
            optionsContainer.style.display = "none";
            
            
            setTimeout(() => {
                optionsContainer.innerHTML = "";
                states[newState].options.forEach(option => {
                    optionsContainer.appendChild(createOptionButton(option));
                });
                optionsContainer.style.display = "flex";
                startTimer();
            }, 8000);
            
            
            modal.style.display = "block";
        }
    }

    // Initialize first state
    updateState("start");
});