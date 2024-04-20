# StrikeOff-To-Do-List
Fully Functional To-do List which retains your list even after page refreshes, a checkbox when marked done strikes through label and removes strike through when unmarked again, add to list button, clear list button, current Date stamp.



1) Header section includes a heading (h1) Todo and a subheading that is today’s date in the following format.

    new Date().toLocaleDateString("en-us", { weekday: "long", year: "numeric", month:"short", day: "numeric" })

2) Main section with 3 sections:

     -Form with an input and a button to submit the form

     -A clear all button to delete all the Todos

     -An unordered list that will have all todos as list items. 

3) Hitting enter or clicking on the '+' button add a new To do to the bottom of the list. It also clear out the input and focus back on it.

4) ‘Clear All’ button after the form is right aligned and deletes all the to-dos.

5) Each to-do can be marked done by clicking on the checkbox which also strikes through the label.
   
6) To-do list is stored in local storage so that whenever you reopen the web application your list gets reloaded in the same state as before you closed the tab.
