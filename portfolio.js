document.addEventListener("DOMContentLoaded", function () {
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  const categories = document.querySelectorAll(".category");

  categories.forEach((category) => {
    category.addEventListener("click", function () {
      // Remove active class from all categories
      categories.forEach((cat) => cat.classList.remove("active"));

      // Add active class to the clicked category
      this.classList.add("active");
      document.getElementById("reloadable").src =
        "https://picsum.photos/200/" + getRandomInt(400);
      console.log(getRandomInt(400));
    });
  });
});
