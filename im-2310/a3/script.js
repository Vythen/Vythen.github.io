// This first event listener ensures that the code will only run after the HTML has finished loading to ensure scroll functionality.
document.addEventListener('DOMContentLoaded', function() {

// Here we have our key three set of variables which helps us determine the contexts for the scrolling.
// Our first variable helps us keep track of whether a scroll event is being handled, with the second variable storing the scrolls current position.
// Our final varriable here serves to help us keep track of whether a font change has already occured.
var ticking = false;
var scrollPosition = 0;
var fontChanged = [false, false];

// This allows the Javascript to recognise the 'content' tag with all of the adjustments that were added in the CSS.
// This ensures that the scroll will work within this box.
var container = document.getElementById('content');

// Here we have our EventListener, which activates when the user scrolls.
// This updates the scrollPosition, which serves as the key variable to be processed in the updateText function.
container.addEventListener('scroll', function () {
  scrollPosition = container.scrollTop;

  // This code ensures that the updateText function is only called once per scroll event.
  // It then proceeds to check the 'ticking' flag, to understand whether a scroll event is currently active.
  // If it is currently not occurring, it sets the flag to true to communicate that an event is currently active.
  // This prevents duplicate calls in case a User decides to immediately scroll all the way to the bottom, or progress at a fast pace.
  // This allows the performance and transitions to feel more responsive to the users input.
  if (!ticking) {
    window.requestAnimationFrame(updateText);
    ticking = true;
  }
});

// These are the two variable thresholds for determining the font changes in relation to the scroll.
function updateText() {
  var threshold1 = 1500;
  var threshold2 = 3250;

  // This allows the Javascript to recognise the 'changing-text' tag.
  var textElement = document.getElementById('changing-text');

  // The following line of code checks to see if the first font change hasn't happened, and whether or not the first threshold variable has been met.
  // When the first threshold has been met, it will execute the if statement.
  // This is followed by calling the flicker function within the specified threshold. This applies the flickering effect to the textElement.
  // The flickering effect is achieved by changing its font family to 'Creepster, cursive', switching at 25ms intervals 20 times.
  // This was done to mimic the horror and jumpscare feeling of horror films/video games. I felt that one of my favorite parts of those kinds of experiences
  // was being surprised by the sudden, rapid changes of things distorting or warping in front of my eyes.
  // This is then followed by a timeout of 1 second, which will then proceed to activate the function inside of it.
  // Said function permanently changes the fontFamily to the new font after completing the flickering of said font.
  // This was done to represent the feeling of being trapped. In horror films or media, there's a constant sense of dread as things escalate to build tension.
  // I wanted to mimic this effect by making the user realize that their actions have resulted in permanent change as the text gradually morphs. Giving them 'no way out'.
  // Then the next line of code indicates to the page that the first font change has occurred.
  // Finally, the else if statement checks to see if the second font change hasn't occurred and whether the scroll position has reached or surpassed the second threshold variable.
  // If a condition is met, it then executes its code, which is akin to what has been used for the first If statement.
  if (!fontChanged[0] && scrollPosition >= threshold1) {
    flicker(textElement, 'Creepster, cursive', 20, 25);
    setTimeout(function () {
      textElement.style.fontFamily = 'Creepster, cursive';
      fontChanged[0] = true;
    }, 1000);
  } else if (!fontChanged[1] && scrollPosition >= threshold2) {
    flicker(textElement, 'Chiller, cursive', 20, 25);
    setTimeout(function () {
      textElement.style.fontFamily = 'Chiller, cursive';
      fontChanged[1] = true;
    }, 1000);
  }

  // This line resets the ticking flag to false. The ticking line controls whether a scroll event is currently being handled.
  // By having it set to false, it states that the scroll event has successfully gone through and the next scroll event can be processed.
  ticking = false;
}

// The flicker function serves to assist the updateText function which helps update and manage the font changes.
// It is called within the UpdateText function to apply the flickering effect to the textElement based on the following lines of code.
// The first line instructs the code to capture the original font family of the defined element in CSS.
// The next line of code is a variable index that helps keep track of the number of times toggleFonts has been called.
// Then we have the toggleFonts function, which is what is creating the flickering effect between the original font and the new font.
// This function is called repeatedly to achieve said effect.
// The next line of code determines whether to use the original font or the new font based on the index variable. If the index is an even number, it uses the original font,
// otherwise, it uses the new font.
// The index++ increases the index by 1 every time toggleFonts is called.
// Count-- decreases the count by 1, with count representing how many times to flicker.
// This is followed by an if statement, which checks if the count is greater than 0. If there are more flickers that need to occur, it calls toggleFonts again until the count reaches 0.
// Lastly, we have toggleFonts, which is what starts the call for the font toggling process.
function flicker(element, newFont, count, interval) {
  var originalFont = element.style.fontFamily;
  var index = 0;

  var toggleFonts = function () {
    var font = index % 2 === 0 ? originalFont : newFont;
    element.style.fontFamily = font;
    index++;
    count--;

    if (count > 0) {
      setTimeout(toggleFonts, interval);
    }
  };

  toggleFonts();
}

});