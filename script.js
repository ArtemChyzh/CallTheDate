document.addEventListener("DOMContentLoaded", function () {
    let btn = document.getElementById("new");
    btn.addEventListener("click", function() {location.reload();});
    fillDoc();
});

async function getActivityResponse() {
    const url = "https://www.boredapi.com/api/activity";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("No activity found");
        }
        return response.json();
    } catch (error) {
        console.error("Error fetching activity:", error);
    }
}

async function getActivityObject() {
    const response = await getActivityResponse();

    let activity = response.activity;

    let occurrences = (activity.match(/with/g) || []).length;
    if (occurrences >= 2) {
        let lastSubIndex = activity.lastIndexOf("with");
        activity = activity.slice(0, lastSubIndex);
    }
    activity = "\u{1F498}" + "Together " + activity.toLowerCase() + "\u{1F498}";


    return { "activity": activity, "category": response.type, "link": response.link };
}

async function fillDoc() {
    let activityLabel = document.getElementById("activity");
    let categoryLabel = document.getElementById("category");
    let link = document.getElementById("link");
    let activityInput = document.getElementById("subject");

    const activity = await getActivityObject();

    activityLabel.innerText = activity.activity;
    categoryLabel.innerText = activity.category;
    if (activity.link) {
        link.setAttribute("href", activity.link);
        link.innerText = activity.link;
    }
    activityInput.setAttribute("value", activity.activity);
}
