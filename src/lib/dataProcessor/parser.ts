import * as fs from 'fs';
import yaml from 'yaml'
import path from 'path';

export abstract class Parser {
    public static parseFolder<T>(folderpath: string): Map<string, T>  {
        const files = fs.readdirSync(folderpath, {
            withFileTypes: true,
        })

        return new Map(Object.entries(files
            .filter(file => file.name.endsWith('.yaml'))
            .map((file) => {
                return Parser.fromYamlFilename<T>(path.join(file.parentPath, file.name));
            })
            .reduce((combined, current) => ({
                ...combined,
                ...current
            })
        )));
    }

    public static fromYamlFilename<T>(filename: string): Record<string, T> {
        const content = fs.readFileSync(filename, { encoding: 'utf-8' });
        return yaml.parse(content);
    }
}