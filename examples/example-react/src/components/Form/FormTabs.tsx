import FormSigner from './FormSigner';
import FormSignerMessage from './FormSignerMessage';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';

export function FormTabs() {
  return (
    <Tabs defaultValue="sign" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="sign">Sign</TabsTrigger>
        <TabsTrigger value="signMessage">Sign Message</TabsTrigger>
      </TabsList>
      <TabsContent value="sign">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Sign</CardTitle>
            <CardDescription>
              Sign a deploy here.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 ">
            <FormSigner/>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="signMessage">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Sign Message</CardTitle>
            <CardDescription>
              Sign a message here.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <FormSignerMessage />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
