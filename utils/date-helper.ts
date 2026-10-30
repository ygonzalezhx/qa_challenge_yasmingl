
export function getFrontendDate(dateTime: string): string {
    const [rawDate] = dateTime.split(' • ');
    const [month, day, year] = rawDate.split('/');

    return `${year}-${month}-${day}`;
}

export function getFrontendTime(dateTime: string): string {
    const [, time] = dateTime.split(' • ');

    return time;
}