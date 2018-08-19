#The JSON Objects that get transmitted over the Network

In this project we use the JavaScript Object Notation  to transmit
Data. There for we developed a few templates for the
transmission of certain kinds of data.

###The general form
In general each JSON Request or Response looks like that:
{
  'cmd':TheCommandThisIsRequestingOrResponding,
  'id':TheIdOfTheMessageOnClientSide,
  'args':TheArgumentsForTheCommand,
  'payload':TheResultOfTheCommand(only by Responses)
}
