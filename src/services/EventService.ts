// src/controllers/EventController.ts
import { Request, Response } from 'express';
import Event from '../models/Event';

class EventService {

  // Function to create new event
  public async createEvent(req: Request, res: Response): Promise<void> {
    try {
      // Extract event details from the request body
      const { event_name, date, description } = req.body;
      console.log("event_name", event_name);
      
      // Create new event record in the database
      const event = await Event.create({ event_name, date, description });
      
      // Respond with the created event and a 201 status code
      res.status(201).json(event);
    } catch (error) {
      console.log("error", error);
      
      // Handle errors and respond with a 500 status code
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  // Function to get all events
  public async getEvents(req: Request, res: Response): Promise<void> {
    try {
      // Retrieve all events from the database
      const events = await Event.findAll();
      
      // Respond with the retrieved events and a 200 status code
      res.status(200).json(events);
    } catch (error) {
      // Handle errors and respond with a 500 status code
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  // Function to update an existing event
  public async updateEvent(req: Request, res: Response): Promise<void> {
    try {
      // Extract the event ID from the request parameters
      const { id } = req.params;
      
      // Extract updated event details from the request body
      const { event_name, date, description } = req.body;
      
      // Find the event by its ID
      const event = await Event.findByPk(id);
      if (event) {
        // Update the event details
        event.event_name = event_name;
        event.date = date;
        event.description = description;
        
        // Save the updated event to the database
        await event.save();
        
        // Respond with the updated event and a 200 status code
        res.status(200).json(event);
      } else {
        // Respond with a 404 status code if the event is not found
        res.status(404).json({ error: 'Event not found' });
      }
    } catch (error) {
      // Handle errors and respond with a 500 status code
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  // Function to delete an event
  public async deleteEvent(req: Request, res: Response): Promise<void> {
    try {
      // Extract the event ID from the request parameters
      const { id } = req.params;
      
      // Find the event by its ID
      const event = await Event.findByPk(id);
      if (event) {
        // Delete the event from the database
        await event.destroy();
        
        // Respond with a success message and a 200 status code
        res.status(200).json({ message: 'Event deleted' });
      } else {
        // Respond with a 404 status code if the event is not found
        res.status(404).json({ error: 'Event not found' });
      }
    } catch (error) {
      // Handle errors and respond with a 500 status code
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default new EventService();
