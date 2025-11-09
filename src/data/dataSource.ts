import { get } from "http";

export const dataSource = {
    users: [
        { id: 1, name: "John Doe", email: "john@example.com", city: "New York", birthday: "1990-01-01" },
        { id: 2, name: "Jane Smith", email: "jane@example.com", city: "Los Angeles", birthday: "1992-02-02" },
    ],
    getUser(id: number) {
        return this.users.find(user => user.id === id);
    }
};
