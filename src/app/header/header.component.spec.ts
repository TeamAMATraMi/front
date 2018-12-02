import { TestBed, async } from '@angular/core/testing';
import { HeaderComponent } from './header.component';

describe('Hello world', () => {

    function helloWorld() {
        return 'Hello world!';
    }

    it('says hello', function() {
        expect(helloWorld()).toEqual('Hello world!');
    });
});
