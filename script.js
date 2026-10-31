// ======================================
// MARIO CLUB - INTERACTIVE FUNCTIONALITY
// ======================================

document.addEventListener("DOMContentLoaded", function () {

    console.log("Mario Club is running!");

    // 1. MOBILE NAVIGATION

    const menuButton = document.querySelector(".menu-toggle");
    const navigation = document.querySelector(".main-nav");

    if (menuButton && navigation) {

        menuButton.addEventListener("click", function () {

            navigation.classList.toggle("active");

            const isOpen = navigation.classList.contains("active");

            menuButton.setAttribute("aria-expanded", isOpen);
            menuButton.setAttribute(
                "aria-label",
                isOpen ? "Close navigation" : "Open navigation"
            );
            const profileForm = document.getElementById("profile-form");
const playerName = document.getElementById("player-name");
const playerAvatar = document.getElementById("player-avatar");
const profileName = document.getElementById("profile-name");
const profileAvatar = document.getElementById("profile-avatar");
const profileStatus = document.getElementById("profile-status");
const deleteProfile = document.getElementById("delete-profile");

function loadPlayerProfile() {
    const savedProfile = localStorage.getItem("marioClubProfile");

    if (savedProfile) {
        const player = JSON.parse(savedProfile);

        profileName.textContent = player.name;
        profileAvatar.textContent = player.avatar;
        profileStatus.textContent = "Your player profile is active!";
        playerName.value = player.name;
        playerAvatar.value = player.avatar;
    }
}

profileForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const player = {
        name: playerName.value.trim(),
        avatar: playerAvatar.value
    };

    if (!player.name) {
        profileStatus.textContent = "Please enter a gaming name.";
        return;
    }

    localStorage.setItem("marioClubProfile", JSON.stringify(player));

    profileName.textContent = player.name;
    profileAvatar.textContent = player.avatar;
    profileStatus.textContent = "Your player profile is active!";
});

deleteProfile.addEventListener("click", function() {
    localStorage.removeItem("marioClubProfile");

    profileName.textContent = "Guest Player";
    profileAvatar.textContent = "🎮";
    profileStatus.textContent = "Welcome to Mario Club!";

    profileForm.reset();
});

loadPlayerProfile();

        });

        navigation.querySelectorAll("a").forEach(function (link) {

            link.addEventListener("click", function () {

                navigation.classList.remove("active");
                menuButton.setAttribute("aria-expanded", "false");

            });

        });
    }


    // 2. GAME SEARCH AND CATEGORY FILTERS

    const searchInput = document.getElementById("game-search");
    const filterButtons = document.querySelectorAll(".filter-btn");
    const gameCards = document.querySelectorAll(".game-card");
    const noGames = document.getElementById("no-games");

    let selectedCategory = "all";

    function filterGames() {

        const searchTerm = searchInput.value.toLowerCase().trim();

        let visibleGames = 0;

        gameCards.forEach(function (card) {

            const gameName = card.textContent.toLowerCase();
            const category = card.dataset.category;

            const matchesSearch = gameName.includes(searchTerm);

            const matchesCategory =
                selectedCategory === "all" ||
                category === selectedCategory;

            if (matchesSearch && matchesCategory) {

                card.style.display = "";

                visibleGames++;

            } else {

                card.style.display = "none";

            }

        });

        if (noGames) {
            noGames.hidden = visibleGames !== 0;
        }
    }

    if (searchInput) {
        searchInput.addEventListener("input", filterGames);
    }

    filterButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            filterButtons.forEach(function (item) {
                item.classList.remove("active");
            });

            button.classList.add("active");

            selectedCategory = button.dataset.category;

            filterGames();

        });

    });


    // 3. NEWSLETTER FORM

    const newsletterForm = document.getElementById("newsletter-form");
    const formMessage = document.getElementById("form-message");

    if (newsletterForm) {

        newsletterForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const emailInput = newsletterForm.querySelector(
                'input[type="email"]'
            );

            const email = emailInput.value.trim();

            if (!email) {

                formMessage.textContent = "Please enter your email address.";
                formMessage.style.color = "#ff5757";

                return;
            }

            formMessage.textContent =
                "Welcome to Mario Club! Your email is ready for subscription.";

            formMessage.style.color = "#71d300";

            newsletterForm.reset();

        });

    }
    // 4. GAME DETAILS POPUP

const modal = document.getElementById("game-modal");
const detailButtons = document.querySelectorAll(".details-btn");
const closeButton = document.querySelector(".modal-close");

function closeModal() {
    if (!modal) return;

    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
}

detailButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        if (!modal) return;

        modal.classList.add("active");
        modal.setAttribute("aria-hidden", "false");

    });

});

if (closeButton) {
    closeButton.addEventListener("click", closeModal);
}

if (modal) {

    modal.addEventListener("click", function(event) {

        if (event.target === modal) {
            closeModal();
        }

    });

}

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {
        closeModal();
    }

});

});