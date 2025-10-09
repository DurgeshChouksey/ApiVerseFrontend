export function redableDate(updatedAt: string) : string {
    const timestamp = updatedAt;
    const date = new Date(timestamp);
    const readable = date.toLocaleDateString('en-GB');
    return readable;
}
