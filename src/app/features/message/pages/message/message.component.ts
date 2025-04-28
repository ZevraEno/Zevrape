import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormsModule} from '@angular/forms';

interface Message {
  id?: number;
  content: string;
  sender: string;
}

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  standalone: true,
  imports: [FormsModule],
  styleUrls: ['./message.component.scss']
}
)
export class MessageComponent implements OnInit {
  messages: Message[] = [];
  newMessage: Message = { content: '', sender: '' };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchMessages();
  }

  fetchMessages(): void {
    this.http.get<Message[]>('http://localhost:8080/api/message')
      .subscribe(data => {
        this.messages = data;
      });
  }

  sendMessage(): void {
    if (this.newMessage.content.trim() && this.newMessage.sender.trim()) {
      this.http.post<Message>('http://localhost:8080/api/message', this.newMessage)
        .subscribe(savedMessage => {
          this.messages.push(savedMessage);
          this.newMessage = { content: '', sender: '' };
        });
    }
  }
}
