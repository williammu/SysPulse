export class FormatUtil {
    static formatBytes(j40: number): string {
        if (j40 === 0)
            return '0 B';
        const k40 = 1024;
        const l40 = ['B', 'KB', 'MB', 'GB', 'TB'];
        const m40 = Math.floor(Math.log(j40) / Math.log(k40));
        return parseFloat((j40 / Math.pow(k40, m40)).toFixed(2)) + ' ' + l40[m40];
    }
    static formatPercent(h40: number, i40: number): string {
        if (i40 === 0)
            return '0%';
        return ((h40 / i40) * 100).toFixed(1) + '%';
    }
    static formatHertz(g40: number): string {
        if (g40 >= 1000000000) {
            return (g40 / 1000000000).toFixed(2) + ' GHz';
        }
        else if (g40 >= 1000000) {
            return (g40 / 1000000).toFixed(2) + ' MHz';
        }
        else if (g40 >= 1000) {
            return (g40 / 1000).toFixed(2) + ' KHz';
        }
        return g40 + ' Hz';
    }
}
