import { Component, Input, SimpleChanges, VERSION } from '@angular/core';
import {
  MonacoEditorLoaderService,
  MonacoStandaloneCodeEditor,
} from '@materia-ui/ngx-monaco-editor';
import { filter, take } from 'rxjs';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @Input() schema: any;

  editorOptions = { theme: 'vs-dark', language: 'javascript' };
  code: string = 'function x() {\nconsole.log("Hello world!");\n}';

  editor: MonacoStandaloneCodeEditor;
  modelUri: monaco.Uri;

  editorInit(editor: MonacoStandaloneCodeEditor) {
    // Here you can access editor instance
    this.editor = editor;
    console.log(this.editor);
    console.log('hola');
    // this.editor.onDidChangeModelContent((dato) => {
    //   console.log(dato);
    // });
    this.editor.onDidChangeCursorSelection((dato) => {
      console.log(dato);
      console.log(this.code);
    });
    this.editor.onDidChangeModelLanguage((dato) => {
      console.log(dato);
    });
    // this.editor.onDidChangeModel.
  }

  constructor(private monacoLoaderService: MonacoEditorLoaderService) {
    this.monacoLoaderService.isMonacoLoaded$
      .pipe(
        filter((isLoaded) => isLoaded),
        take(1)
      )
      .subscribe(() => {
        // here, we retrieve monaco-editor instance
        //  monaco.setTheme(...);
        // console.log(monaco);
      });
  }
}
