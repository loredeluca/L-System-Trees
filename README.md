# L-System-Trees
This software allows to build a garden by inserting various types of trees, generated using L-System.
In particular, it implements what is described in the paper [“Graphical modeling using L-system”](http://algorithmicbotany.org/papers/abop/abop-ch1.pdf).
The work was written in Javascript, using the Three.js framework, and the graphical user interface is shown below:

![output](https://github.com/loredeluca/L-System-Trees/blob/master/garden.gif)


### How to install
Download code and run `index.html` with a browser with local server to load textures (you can use [Web Server for Chrome](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb)).

### How to make it work
Using the graphical user interface `dat.gui`, you can change the variables that allow to model your garden:
- In the first folder:
	- Choose one of six different types of default plants or the _other_ option to generate a new plant
	- Select the 'stochastic' option to generate random trees
	- Choose where to place the tree in the garden by changing the _posX_ and _posY_ parameters
- In the second folder:
	- You can view the axiom and two production rules that generate the default plants or modify each field to generate a new plant
- In the third folder:
	- Choose the other tree parameters, such as the number of iterations, branch angle, branch radius, radius reduction factor and branch length
- Render with the button

### References
[1] Carl Olsson, [“L-System Project”](https://www.carl-olsson.com/project/l-system/), January 2015
